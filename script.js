function getAdvice() {
    let crop = document.getElementById("crop").value || "Your crop";
    let soil = document.getElementById("soil").value;
    let weather = document.getElementById("weather").value;
    let stage = document.getElementById("stage").value;

    let baseDays = 1; // default interval

    // Base interval per crop
    if (crop.toLowerCase() === "wheat") baseDays = 2;
    else if (crop.toLowerCase() === "rice") baseDays = 1;
    else if (crop.toLowerCase() === "tomato") baseDays = 1;

    // Adjust for soil
    if (soil === "sandy") baseDays -= 0.5;
    else if (soil === "clay") baseDays += 0.5;

    // Adjust for growth stage
    if (stage === "flowering") baseDays -= 0.3;
    else if (stage === "seedling") baseDays += 0.2;

    let advice = "";

    // Dynamic irrigation timing
    let irrigationTimes = [];
    if (weather === "rainy") {
        advice = "🌧 No irrigation needed today due to rainfall.";
    } else {
        if (soil === "sandy") irrigationTimes.push("6:30 AM", "6:30 PM");
        else if (soil === "clay") irrigationTimes.push("7:00 AM");
        else irrigationTimes.push("7:00 AM", "6:00 PM");

        if (weather === "hot") irrigationTimes = irrigationTimes.map(t => "6:00–8:00 AM");
        if (stage === "flowering") irrigationTimes.push("11:00 AM (extra)");

        advice += `💧 Irrigation times: ${irrigationTimes.join(", ")}. `;
        advice += stage === "flowering" ? "🌸 Flowering stage needs extra moisture." : "";
        advice += stage === "seedling" ? "🌱 Avoid overwatering young plants." : "";

        // Next irrigation date (first time slot)
        let nextIrrigation = new Date();
        nextIrrigation.setDate(nextIrrigation.getDate() + baseDays);
        advice += `<br>⏰ Next irrigation day: ${nextIrrigation.toDateString()}`;
    }

    document.getElementById("result").innerHTML =
        `<strong>Crop:</strong> ${crop}<br><br>${advice}`;
}
