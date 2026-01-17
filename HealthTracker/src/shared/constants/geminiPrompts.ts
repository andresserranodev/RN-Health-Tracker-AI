export const EXTRACT_BLOOD_PRESSURE_PROMPT = `Your task is to analyze the image of a blood pressure monitor and extract the key medical readings. Transcribe only the numerical values for systolic pressure, diastolic pressure, and pulse.
Return the output exclusively in JSON format with the following structure:

{
  "systolic": NUMBER,
  "diastolic": NUMBER,
  "pulse": NUMBER
}

If a value cannot be determined from the image, use null as the value in the JSON. Do not include any additional explanation outside of the JSON object.`;
