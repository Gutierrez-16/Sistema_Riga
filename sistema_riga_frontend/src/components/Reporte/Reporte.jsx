import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import Header from "../Header/Header";
import Dashboard from "../Header/Head";

export default function MultiAxisDemo() {
    const [chartData1, setChartData1] = useState({});
    const [chartOptions1, setChartOptions1] = useState({});
    const [chartData2, setChartData2] = useState({});
    const [chartOptions2, setChartOptions2] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data1 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Dataset 1',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: [65, 59, 80, 81, 56, 55, 10]
                },
                {
                    label: 'Dataset 2',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    yAxisID: 'y1',
                    tension: 0.4,
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        const options1 = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                }
            }
        };

        const data2 = {
            datasets: [
                {
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--bluegray-500'),
                        documentStyle.getPropertyValue('--blue-500')
                    ],
                    label: 'My dataset'
                }
            ],
            labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
        };

        const options2 = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData1(data1);
        setChartOptions1(options1);
        setChartData2(data2);
        setChartOptions2(options2);
    }, []);

    return (
        <div>
            <Dashboard />
            <div className="flex">
                <div className="w-1/3">
                    <Header />
                </div>
                <div className="col-9 xl:col-10">
                    <div className="card p-4 mb-4">
                        <h2 className="text-center">Reporte Ventas 1</h2>
                        <Chart type="line" data={chartData1} options={chartOptions1} style={{ height: '300px' }} />
                    </div>
                    <div className="card p-4">
                        <h2 className="text-center">Reporte Ventas 2</h2>
                        <Chart type="polarArea" data={chartData2} options={chartOptions2} style={{ height: '300px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
