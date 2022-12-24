export interface LineChartData {
  labels: string[];
  dataset: {
    [key: string]: number[]
  }
}
