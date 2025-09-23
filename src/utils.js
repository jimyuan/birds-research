export const decodeData = json => JSON.parse( BIRDREPORT_APIJS.decode( json[ 'data' ] ) )

/**
 * 格式化数字为千分位显示
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
export const formatNumber = num => {
  return num.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," );
}
