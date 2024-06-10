import { Bar } from 'react-chartjs-2';

function HorizontalBar(props: any) {
    return (
      // <Spin spinning={isLoading}>
        <Bar
          className='h-96'
            options={{
                responsive: true,
                indexAxis: 'x',
                scales: {
                    x: {
                      border: {
                        display: false
                      },
                      grid: {
                        display: false,
                      }
                    },
                    y:{
                        border: {
                            display: false
                        },
                        grid:{
                            display:false,
                            drawOnChartArea: true,
                            drawTicks: true,
                        },
                        // offset:true
                    }
                },   
                elements: {
                  bar: {
                    borderWidth: 1,

                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  },
                  subtitle:{
                    display:true
                  },
                  datalabels: {
                    anchor: 'end',
                    align:'end',
                  },
                },
              }}
              data={{
                labels: props?.labelData,
                datasets: [
                  {
                    label: "New",
                    data: props?.valueData,
                    backgroundColor: "rgba(8, 59, 118, 1)",
                  },
                ],
              }}
        />
      // </Spin>
    );
}

export default HorizontalBar;