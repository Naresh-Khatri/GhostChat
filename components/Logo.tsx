import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react'

function Logo({
  size,
  color = null,
}: {
  size: number
  color?: 'light' | 'dark' | null
}) {
  const { toggleColorMode } = useColorMode()
  const colors = { light: '#f7f7f7', dark: '#292929' }
  const textColor = useColorModeValue(colors.dark, colors.light)
  let logoColor = color ? colors[color] : textColor
  //   let logoColor = 'rgba(71,169,255,1)'
  return (
    <Button variant={'ghost'} m={0} p={0} onClick={toggleColorMode}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        id='svg'
        version='1.1'
        width={size}
        height={size}
        viewBox={`0, 0, 400, 400`}
      >
        <g id='svgg'>
          <path
            id='path0'
            d='M190.000 9.413 C 175.859 11.372,167.283 14.530,156.438 21.771 C 139.086 33.355,131.045 43.834,123.050 65.276 C 118.466 77.571,118.065 79.118,111.606 109.400 C 110.714 113.580,109.094 119.995,108.006 123.656 C 106.917 127.318,105.108 133.798,103.986 138.056 C 100.766 150.278,95.322 164.902,89.025 178.241 C 86.943 182.653,77.375 198.038,74.600 201.438 C 65.822 212.191,56.595 221.413,47.800 228.224 C 45.600 229.928,41.271 233.444,38.180 236.038 C 35.089 238.632,30.808 242.089,28.665 243.720 C 13.193 255.501,8.453 263.472,9.955 275.184 C 12.933 298.406,40.331 305.295,78.400 292.393 C 82.250 291.089,87.200 289.633,89.400 289.158 C 99.302 287.022,99.308 285.503,89.467 273.870 C 85.101 268.709,80.036 264.360,72.600 259.387 C 68.547 256.676,66.705 255.713,57.319 251.399 C 43.959 245.259,62.378 244.598,79.600 250.599 C 90.509 254.400,105.284 266.297,115.381 279.411 C 116.901 281.385,119.434 284.620,121.010 286.600 C 122.586 288.580,124.836 291.640,126.011 293.400 C 127.185 295.160,129.510 298.400,131.176 300.600 C 132.843 302.800,136.042 307.480,138.285 311.000 C 140.528 314.520,143.308 318.570,144.462 320.000 C 145.616 321.430,148.081 324.573,149.940 326.983 C 159.720 339.667,174.766 353.568,183.400 357.897 C 189.455 360.933,201.246 364.481,210.421 366.026 C 228.183 369.018,250.558 364.800,264.612 355.809 C 270.677 351.930,288.109 336.360,293.061 330.400 C 311.316 308.427,327.582 297.918,355.946 289.771 C 378.375 283.329,390.000 272.671,390.000 258.550 C 390.000 251.881,389.700 251.603,370.600 240.592 C 352.608 230.218,328.354 205.857,318.859 188.622 C 312.464 177.013,306.906 165.213,304.624 158.400 C 303.335 154.550,301.388 148.970,300.297 146.000 C 297.936 139.571,294.976 128.066,291.600 112.200 C 290.243 105.820,287.990 96.550,286.594 91.600 C 285.197 86.650,283.492 80.365,282.804 77.633 C 275.765 49.665,262.967 31.779,240.401 18.373 C 228.259 11.159,205.978 7.198,190.000 9.413 M182.245 72.063 C 193.094 77.163,192.864 108.982,181.937 114.633 C 170.392 120.603,162.061 91.898,171.014 77.000 C 174.268 71.586,177.866 70.005,182.245 72.063 M230.765 72.575 C 239.254 78.459,240.076 103.630,232.067 112.494 C 224.528 120.840,214.709 109.844,214.658 93.000 C 214.612 77.602,222.883 67.114,230.765 72.575 '
            stroke='none'
            fill={logoColor}
            fillRule='evenodd'
          />
          <path
            id='path1'
            d='M0.000 204.000 L 0.000 408.000 200.000 408.000 L 400.000 408.000 400.000 204.000 L 400.000 0.000 200.000 0.000 L 0.000 0.000 0.000 204.000 M215.400 9.963 C 224.416 11.547,234.781 15.034,240.401 18.373 C 262.967 31.779,275.765 49.665,282.804 77.633 C 283.492 80.365,285.197 86.650,286.594 91.600 C 287.990 96.550,290.243 105.820,291.600 112.200 C 294.976 128.066,297.936 139.571,300.297 146.000 C 301.388 148.970,303.335 154.550,304.624 158.400 C 306.906 165.213,312.464 177.013,318.859 188.622 C 328.354 205.857,352.608 230.218,370.600 240.592 C 389.700 251.603,390.000 251.881,390.000 258.550 C 390.000 272.671,378.375 283.329,355.946 289.771 C 336.527 295.349,325.718 300.330,315.800 308.272 C 309.693 313.163,297.626 324.905,293.061 330.400 C 288.109 336.360,270.677 351.930,264.612 355.809 C 250.558 364.800,228.183 369.018,210.421 366.026 C 201.246 364.481,189.455 360.933,183.400 357.897 C 174.766 353.568,159.720 339.667,149.940 326.983 C 148.081 324.573,145.616 321.430,144.462 320.000 C 143.308 318.570,140.528 314.520,138.285 311.000 C 136.042 307.480,132.843 302.800,131.176 300.600 C 129.510 298.400,127.185 295.160,126.011 293.400 C 124.836 291.640,122.586 288.580,121.010 286.600 C 119.434 284.620,116.901 281.385,115.381 279.411 C 105.284 266.297,90.509 254.400,79.600 250.599 C 62.378 244.598,43.959 245.259,57.319 251.399 C 66.705 255.713,68.547 256.676,72.600 259.387 C 80.036 264.360,85.101 268.709,89.467 273.870 C 99.308 285.503,99.302 287.022,89.400 289.158 C 87.200 289.633,82.250 291.089,78.400 292.393 C 40.331 305.295,12.933 298.406,9.955 275.184 C 8.453 263.472,13.193 255.501,28.665 243.720 C 30.808 242.089,35.089 238.632,38.180 236.038 C 41.271 233.444,45.600 229.928,47.800 228.224 C 56.595 221.413,65.822 212.191,74.600 201.438 C 77.375 198.038,86.943 182.653,89.025 178.241 C 95.322 164.902,100.766 150.278,103.986 138.056 C 105.108 133.798,106.917 127.318,108.006 123.656 C 109.094 119.995,110.714 113.580,111.606 109.400 C 118.065 79.118,118.466 77.571,123.050 65.276 C 127.645 52.953,128.251 51.710,133.092 44.703 C 152.088 17.207,182.818 4.237,215.400 9.963 M175.757 72.014 C 164.631 77.521,164.439 107.797,175.488 114.273 C 184.977 119.834,193.099 102.169,189.365 84.092 C 187.289 74.041,181.694 69.075,175.757 72.014 M223.171 71.968 C 210.059 79.108,212.925 115.200,226.604 115.200 C 238.660 115.200,242.056 80.401,230.765 72.575 C 228.619 71.089,225.276 70.822,223.171 71.968 '
            stroke='none'
            fill='#00000000'
            fillRule='evenodd'
          />
        </g>
      </svg>
    </Button>
  )
}

export default Logo
