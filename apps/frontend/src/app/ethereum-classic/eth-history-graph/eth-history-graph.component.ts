import { Component } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of, switchMap, tap } from "rxjs";
import {
  ApolloAngularSDK,
  IEtcHistoryQuery,
  IListenEtcHistorySubscription,
} from "@blockchain_client/graph-ql-client";
import { AgChartOptions, time } from "ag-charts-community";

type History = IEtcHistoryQuery["etcHistory"] | IListenEtcHistorySubscription["etcHistory"];

@Component({
  selector: 'eth-history-graph',
  templateUrl: './eth-history-graph.component.html',
  styleUrls: ['./eth-history-graph.component.scss']
})
export class EthHistoryGraphComponent {
  public data: AgChartOptions = {};
  data$: Observable<undefined | History> = this.gql.etcHistory().pipe(
    map(response => response.data?.etcHistory),
    tap(data => {
      const parsedData = data?.data.map((v) => ({
        time: parseFloat(v.time),
        value: parseFloat(v.priceUsd)
      }))
      this.data = {
        background: {
          visible: true,
          fill: '#141414'
        },
        theme: {
          baseTheme: 'ag-vivid-dark',
          overrides: {
            column: {
              navigator: { enabled: true },
            },
            area: {
              axes: {
                time: {
                  tick: {
                    count: time.month.every(1)
                  }
                },
                number: {
                  tick: {
                    count: 5
                  }
                }
              },
              autoSize: true,
              series: {
                marker: {
                  enabled: false
                }
              }
            },
            line: {
              autoSize: true,
              series: {
                marker: {
                  enabled: false
                }
              }
            }
          }
        },
        title: {
          enabled: true,
          text: 'Price'
        },
        subtitle: {
          enabled: true,
          text: 'USD'
        },
        autoSize: true,
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        },
        axes: [
          {
            position: 'left',
            type: 'number',
            title: {
              enabled: true,
              text: "Price (USD)"
            }
          },
          {
            position: 'bottom',
            type: 'time',
            title: {
              enabled: true,
              text: 'Date-Time'
            }
          }
        ],
        series: [
          {
            type: 'area',
            yKey: 'value',
            xKey: 'time',
            xName: 'Date-Time',
            yName: 'Price',
            data: parsedData,
            marker: {
              enabled: false
            }
          }
        ],
        navigator: { enabled: true },
      }
    }),
    switchMap(() => this.gql.listenEtcHistory()),
    map(response => response.data?.etcHistory),
    tap(data => {
      const parsedData = data?.data.map((v) => ({
        time: parseFloat(v.time),
        value: parseFloat(v.priceUsd)
      }))
      this.data = {
        background: {
          visible: true,
          fill: '#141414'
        },
        theme: {
          baseTheme: 'ag-vivid-dark',
          overrides: {
            column: {
              navigator: { enabled: true },
            },
            area: {
              axes: {
                time: {
                  tick: {
                    count: time.month.every(2)
                  }
                },
                number: {
                  tick: {
                    count: 5
                  }
                }
              },
              autoSize: true,
              series: {
                marker: {
                  enabled: false
                }
              }
            },
            line: {
              autoSize: true,
              series: {
                marker: {
                  enabled: false
                }
              }
            }
          }
        },
        title: {
          enabled: true,
          text: 'Price'
        },
        subtitle: {
          enabled: true,
          text: 'USD'
        },
        autoSize: true,
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        },
        axes: [
          {
            position: 'left',
            type: 'number',
            title: {
              enabled: true,
              text: "Price (USD)"
            }
          },
          {
            position: 'bottom',
            type: 'time',
            title: {
              enabled: true,
              text: 'Date-Time'
            }
          }
        ],
        series: [
          {
            type: 'area',
            yKey: 'value',
            xKey: 'time',
            xName: 'Date-Time',
            yName: 'Price',
            data: parsedData,
            marker: {
              enabled: false
            }
          }
        ],
        navigator: { enabled: true },
      }
    }),
  );

  error$ = this.data$.pipe(
    ignoreElements(),
    catchError((err) => {
      return of(err);
    })
  )

  constructor(
    private gql: ApolloAngularSDK
  ) { }

}
