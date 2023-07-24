import sessionDetail from "../conts/sessionDetail";


function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // Convert distance to meters

  return distance;
}

// Function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}


export default function CheckDistance({ latitude, longitude }) {
  const distance = calculateDistance(latitude, longitude, sessionDetail.fixedLatitude, sessionDetail.fixedLongitude);


  return distance;
  // Check if the distance is within 50 meters
  // if (distance <= 50) {
  // Current location is within 50 meters of the fixed location
  //   console.log('Within 50 meters');
  //   alert(distance)
  //   alert("Within 50 meters")
  // } else {
  // Current location is not within 50 meters of the fixed location
  //   console.log('Not within 50 meters');
  //   alert(distance)
  //   alert("Not Within 50 meters")
  // }


}