function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomFloat(min: number, max: number, decimals: number) {
    const str = (Math.random() * (max - min + 1) + min).toFixed(decimals);
    return parseFloat(str);
  }
  
  function getRandomBool() {
    return Math.random() < 0.5;
  }
  
  function getRandomDate() {
    const now = new Date();
    const pastDate = new Date(now.setMonth(now.getMonth() - getRandomInt(1, 12)));
    return pastDate.toISOString().replace('T', ' ').replace('Z', '');
  }
  
  function generateRandomVehicleData() {
    const vehicleData = [];
    const vehicleCount = 1; // Generate between 3 to 10 vehicles
  
    for (let i = 0; i < vehicleCount; i++) {
      const vehicle = {
        id: getRandomInt(600, 2000),
        iot_connected: getRandomBool(),
        battery_percentage: getRandomInt(0, 100),
        drive_mode: "Normal",
        created_at: new Date().toISOString().replace('T', ' ').replace('Z', ''),
        updated_at: new Date().toISOString().replace('T', ' ').replace('Z', ''),
        imei: `AB93EF6RFPB545${getRandomInt(3000, 6000)}`,
        ambient_temp: getRandomFloat(15, 35, 1).toString(),
        battery_temp: getRandomFloat(20, 50, 1).toString(),
        co2_saved: getRandomFloat(100, 1000, 5),
        fuel_saved: getRandomFloat(100, 1000, 5),
        last_seen_at: getRandomDate(),
        latitude: getRandomFloat(12, 14, 6),
        longitude: getRandomFloat(75, 78, 6),
        location_last_updated: getRandomDate(),
        total_energy: getRandomFloat(500, 3000, 4),
        vehicle_condition: getRandomBool() ? "Inactive" : "Running",
        charging: getRandomBool(),
        last_speed: getRandomInt(0, 60),
        max_speed: getRandomInt(50, 100),
        total_operational_hours: getRandomFloat(100, 2000, 4),
        distance_travelled_today: getRandomFloat(0, 100, 3),
        total_odometer: getRandomFloat(5000, 30000, 3),
        vehicle_id: `AB93EF6RFPB545${getRandomInt(3000, 6000)}`,
        daily_avg_speed: getRandomInt(0, 100),
        daily_speed_count: getRandomInt(0, 300),
        monthly_runtime: getRandomFloat(50, 200, 5),
        monthly_distance_travelled: getRandomFloat(-100000, 0, 5),
        averageBatteryTemp: getRandomInt(0, 50),
        totalChargeCurrent: getRandomInt(4000, 7000),
        totalDischargeCurrent: getRandomInt(4000, 7000),
      };
  
      vehicleData.push(vehicle);
    }
  
    return vehicleData;
  }

  export default generateRandomVehicleData;