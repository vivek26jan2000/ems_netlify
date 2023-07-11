import { useTime } from "react-timer-hook";

function MyTime() {
  const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });

  return (
    <div
      style={{
        fontSize: "13px",
        fontWeight: "700",
        flex: 1,
        alignItems: "center",
        alignSelf: "center",
        marginTop: "2px",
      }}
    >
      <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      <span className="text-uppercase" style={{ marginLeft: "1.5px" }}>
        {ampm}
      </span>
    </div>
  );
}
export default MyTime;
