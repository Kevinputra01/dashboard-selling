import { useEffect, useState } from "react";
import { Card, Typography, DatePicker } from "antd";
import LineChart from "./LineChart";
import store from "../../global/store";
import HorizontalBar from "./HorizontalBar";
import TableSales from "./TableSales";

function MainDashboard() {
  const [dataTable, setDataTable] = useState([]);
  const [dataStatistic, setDataStatistic] = useState<{
    sales: number;
    revenue: number;
    product: string;
  }>({
    sales: 0,
    revenue: 0,
    product: "",
  });
  const [nameProduct, setNameProduct] = useState<string[]>([]);
  const [valueProduct, setValueProduct] = useState<number[]>([]);
  const [dateProduct, setDateProduct] = useState<string[]>([]);
  const [valueDateProduct, setValueDateProduct] = useState<number[]>([]);
  const [pickedDates, setPickedDates] = useState<string[]>([]);

  const { RangePicker } = DatePicker;

  const getAlertSummary = (product: any, date_start: any, date_end: any) => {
    store.actions.listSales(product, date_start, date_end).then((res: any) => {
      setDataTable(res);

      let dateProduct: string[] = res
        .map((data: any) => data.date)
        .reduce((x: any, y: any) => (x.includes(y) ? x : [...x, y]), [])
        .sort(
          (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
        );
      let resultSales: number[] = dateProduct.map((data: any) =>
        res
          .map((item: any) => (item.date === data ? item.sales : 0))
          .reduce((prev: any, curr: any) => prev + curr, 0)
      );
      setDateProduct(dateProduct);
      setValueDateProduct(resultSales);

      let nameProductList: string[] = res
        .map((data: any) => data.product)
        .reduce((x: any, y: any) => (x.includes(y) ? x : [...x, y]), []);
      let resultProduct: number[] = nameProductList.map((data: any) =>
        res
          .map((item: any) => (item.product === data ? item.sales : 0))
          .reduce((prev: any, curr: any) => prev + curr, 0)
      );
      setNameProduct(nameProductList);
      setValueProduct(resultProduct);

      const totalSales: number = res
        .map((data: any) => data.sales)
        .reduce((prev: any, curr: any) => prev + curr, 0);
      const totalRevenue: number = res
        .map((data: any) => data.revenue)
        .reduce((prev: any, curr: any) => prev + curr, 0);
      const bestSeller: string =
        nameProductList[resultProduct.indexOf(Math.max(...resultProduct))];

      setDataStatistic({
        sales: totalSales,
        revenue: totalRevenue,
        product: bestSeller,
      });
    });
  };

  useEffect(() => {
    getAlertSummary(null, pickedDates[0], pickedDates[1]);
  }, []);

  const getNumberUnit = function (num: number, round = 2) {
    const unit = Math.floor(
        Math.round(num / 1.0e1)
          .toLocaleString()
          .replaceAll(",", "").length
      ),
      wunit = [
        "Thousand",
        "Million",
        "Billion",
        "Trillion",
        "Quadrillion",
        "Quintillion",
        "Sextillion",
        "Septillion",
        "Octillion",
        "Nonillion",
        "Decillion",
        "Undecillion",
        "Duodecillion",
        "Tredecillion",
        "Quattuordecillion",
        "Quindecillion",
        "Sexdecillion",
        "Septemdecillion",
        "Octodecillion",
        "Novemdecillion",
        "Vigintillion",
        "Unvigintillion",
        "Duovigintillion",
        "Trevigintillion",
        "Quattuorvigintillion",
        "Quinvigintillion",
        "Sexvigintillion",
        "Septvigintillion",
        "Octovigintillion",
        "Nonvigintillion",
        "Trigintillion",
        "Untrigintillion",
        "Duotrigintillion",
      ][Math.floor(unit / 3) - 1],
      funit = Math.abs(Number(num)) / Number("1.0e+" + (unit - (unit % 3)));
    return wunit
      ? funit.toFixed(round).toLocaleString() + " " + wunit
      : num.toFixed(round).toString();
  };

  interface ResumeType {
    name: string;
    count: number | string;
  }

  const resume: ResumeType[] = [
    {
      name: "Total Sales",
      count: dataStatistic.sales,
    },
    {
      name: "Total Revenue",
      count: dataStatistic.revenue,
    },
    {
      name: "Best Seller Product",
      count: dataStatistic.product,
    },
  ];

  const handleDateChange = (dates: any, dateString: any) => {
    if (dates) {
      let startDate = dateString[0];
      let endDate = dateString[1];
      console.log(startDate);
      console.log(endDate);
      setPickedDates([startDate, endDate]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="mx-9 w-full">
        <div className="text-end mx-9 mt-5 mb-4">
          <RangePicker onChange={handleDateChange} />
        </div>
        <div className="h-full grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-3 mx-9">
          {resume.map((item: any, index: number) => (
            <Card key={index} className="h-30 border text-black mb-4 shadow-md">
              <div className={`flex justify-center box-border`}>
                <div className="justify-center items-center">
                  <Typography className="text-sm">{item.name}</Typography>
                  <Typography className="text-2xl font-semibold text-secondary-color">
                    {typeof item.count === "number"
                      ? getNumberUnit(item.count)
                      : item.count}
                  </Typography>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 justify-center mb-4 mx-9">
          <Card className="shadow-md">
            <LineChart labelData={dateProduct} valueData={valueDateProduct} />
          </Card>
          <Card className="shadow-md">
            <HorizontalBar labelData={nameProduct} valueData={valueProduct} />
          </Card>
        </div>
        <Card className="shadow-md mx-9 mb-5">
          <TableSales dataTable={dataTable} />
        </Card>
      </div>
    </div>
  );
}
export default MainDashboard;
