<template>
	<view class="wrap">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">最近一周</view>
		</view>
		<view class="qiun-charts">
			<canvas canvas-id="canvasColumn2" id="canvasColumn2" class="charts" @touchstart="touchColumnWeek"></canvas>
		</view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">最近一月</view>
		</view>
		<view class="qiun-charts">
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
		</view>
	</view>
</template>

<script>
	import Decode from "@/utils/decode.js"
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	import { getStep } from "@/api/mine.js"
	import { getOpenID } from "@/api/mine.js"
	let self;
	let canvaColumnWeek = {};
	let canvaColumn = {};
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',

				// chartData: {
				// 	categories: [],
				// 	series: [{
				// 		name: "运动步数",
				// 		data: [10,{ "value": 40, "color": "#facc14" }]
				// 	}]
				// }
				chartData: {
					categories: [],
					series: [{
						name: "最近一月运动步数",
						data: []
					}],
					type: "column"
				},
				chartDataWeek: {
					categories: [],
					series: [{
						name: "最近一周运动步数",
						data: []
					}],
					type: "column"
				}
			};
		},
		methods: {

			showColumn(canvasId, chartData, status) {
				
				if (!status) {
					
					console.log(canvasId, chartData)
					canvaColumn = new uCharts({
						$this: self,
						canvasId: canvasId,
						type: chartData.type,
						colors: ["#8dc63f"],
						legend: { show: true },
						fontSize: 11,
						background: '#FFFFFF',
						pixelRatio: self.pixelRatio,
						animation: true,
						categories: chartData.categories,
						series: chartData.series,
						xAxis: {
							disableGrid: true,
						},
						yAxis: {
							//disabled:true
						},
						dataLabel: true,
						width: self.cWidth * self.pixelRatio,
						height: self.cHeight * self.pixelRatio,
						extra: {
							column: {
								type: 'group',
								width: self.cWidth * self.pixelRatio * 0.45 / chartData.categories.length
							}
						}
					});
				} else {
					console.log(canvasId, chartData)
					canvaColumnWeek = new uCharts({
						$this: self,
						canvasId: canvasId,
						type: chartData.type,
						colors: ["#8dc63f"],
						legend: { show: true },
						fontSize: 11,
						background: '#FFFFFF',
						pixelRatio: self.pixelRatio,
						animation: true,
						categories: chartData.categories,
						series: chartData.series,
						xAxis: {
							disableGrid: true,
						},
						yAxis: {
							//disabled:true
						},
						dataLabel: true,
						width: self.cWidth * self.pixelRatio,
						height: self.cHeight * self.pixelRatio,
						extra: {
							column: {
								type: 'group',
								width: self.cWidth * self.pixelRatio * 0.45 / chartData.categories.length
							}
						}
					});
				}

				// console.log(canvaColumn)
			},

			touchColumn(e) {

				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				});
			},

			touchColumnWeek(e) {

				canvaColumnWeek.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				});
			},

			getStep() {
				let code;
				try {
					uni.getProvider({
						service: 'oauth',
						success: function(res) {
							console.log(res.provider)
							if (~res.provider.indexOf('weixin')) {
								uni.login({
									success(res) {
										if (res.code) {
											code = res.code;
											// #ifdef MP-WEIXIN
											wx.getWeRunData({
												async success(res) {
													res.code = code;
													const step = await getStep(res);
													if (step.status === 0) {
														step.data.stepInfoList.map((item, index) => {
															let date = new Date()

															date.setTime(item.timestamp * 1000);
															console.log(date.getDate())
															if (index % 5 === 0) {
																self.chartData.categories.push(date.getMonth() + 1 + "-" + date.getDate())
																self.chartData.series[0].data.push(item.step)
															}
															if (index > 23) {
																self.chartDataWeek.categories.push(date.getMonth() + 1 + "-" + date.getDate())
																console.log(date.getDate(), item.step)
																self.chartDataWeek.series[0].data.push(item.step)
															}
															// self.chartData.categories[Math.floor(index / 5)].push(date.getMonth() + 1 + "-" + date.getDate())
														})
														console.log(self.chartData.categories, self.chartData.series[0].data)
														self.showColumn("canvasColumn", self.chartData, "")
														self.showColumn("canvasColumn2", self.chartDataWeek, 1)
													} else {
														throw new Error("解密失败")
													}
												}
											})
											// #endif
										} else {
											console.log('登录失败！' + res.errMsg)
										}
									}
								})
							}
						}
					});
				} catch (e) {
					console.log(e)
					uni.showToast({
						title: "系统异常",
						icon: "none"
					})
					//TODO handle the exception
				}
			}

		},

		created() {
			this.getStep()
		},

		onShow() {
			self = this
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			// this.getServerData();
			// this.init()
		}
	}
</script>

<style lang="scss">
	// .wrap {
	// 	padding: 10rpx;
	// }

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	.qiun-charts {
		width: 100%;
		height: 610upx;
		overflow: hidden;
		// margin-top: 10rpx;
		background-color: #FFFFFF;
	}

	.charts {
		margin-top: 10upx;
		width: 750upx;
		height: 600upx;
		background-color: #FFFFFF;
	}
</style>
