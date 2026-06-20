function wellnessScore(patient){

let score = 100;

if(patient.smokingHabits === "Yes")
score -= 20;

if(patient.alcoholHabits === "Yes")
score -= 10;

if(patient.sleepingHabits.includes("5"))
score -= 15;

return score;
}

module.exports = wellnessScore;