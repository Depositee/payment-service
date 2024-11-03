export default function convertPgTimestampToDate(pgTimestamp: {
  seconds: string;
  nanos: number;
}): Date {
  const seconds = parseInt(pgTimestamp.seconds, 10); // Convert seconds to an integer
  const milliseconds = seconds * 1000 + Math.floor(pgTimestamp.nanos / 1000000); // Convert nanos to milliseconds

  return new Date(milliseconds); // Create a Date object
}
