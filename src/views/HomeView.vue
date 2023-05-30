<template>
  <div class="home">
    <h1>Tracker App</h1>
    <input type="text" v-model="latitude" placeholder="Latitude" />
    <input type="text" v-model="longitude" placeholder="Longitude" />

    <button @click="sendTrackData">Send track data</button>

    <div style="margin: auto; width: 50%; border: 3px solid green; padding: 10px; margin-top: 50px;">
      <table>
        <thead>
          <td>#</td>
          <td>Latitude</td>
          <td>Longitude</td>
          <td>Sample time</td>
        </thead>
        <tbody>
          <tr v-for="(location, pos) in deviceHistory">
            <td>{{ pos }}</td>
            <td>{{ location.Position[1] }}</td>
            <td>{{ location.Position[0] }}</td>
            <td>{{ location.SampleTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { Auth } from 'aws-amplify'
import {
  LocationClient,
  BatchUpdateDevicePositionCommand,
  GetDevicePositionHistoryCommand,
} from '@aws-sdk/client-location'
import { ref } from 'vue'

const latitude = ref(null)
const longitude = ref(null)

const deviceHistory = ref(null)

Auth.currentCredentials()
  .then((credentials) => {
    return new LocationClient({
      credentials,
      region: 'us-east-1',
    })
  })
  .then((client) => {
    const input = {
      TrackerName: 'DeliveryPerson1',
      DeviceId: 'ExampleDevice-1',
    }

    const command = new GetDevicePositionHistoryCommand(input)

    return client.send(command)
  })
  .then((result) => (deviceHistory.value = result.DevicePositions))

const sendTrackData = () => {
  const input = {
    TrackerName: 'DeliveryPerson1',
    Updates: [
      {
        DeviceId: 'ExampleDevice-1',
        SampleTime: new Date(),
        Position: [Number(longitude.value), Number(latitude.value)],
      },
    ],
  }

  Auth.currentCredentials()
    .then((credentials) => {
      return new LocationClient({
        credentials,
        region: 'us-east-1',
      })
    })
    .then((locationClient) => {
      const command = new BatchUpdateDevicePositionCommand(input)
      return locationClient.send(command)
    })
    .then((result) => window.alert(`Request ID: ${result.$metadata.requestId}`))
}
</script>
