import { Line } from "react-chartjs-2";

export default function LineChart(props: any) {
  return (
    <Line
    className='h-96'
      options={{
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },  
          y: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: false,
          },
        },
      }}
      data={{
        labels: props.labelData,
        datasets: [
          {
            label: "New",
            data: props.valueData,
            backgroundColor: "white",
            borderColor: "rgba(8, 59, 118, 1)",
          },
        ],
      }}
    />
  );
}
