/**
 * Source: UAC, "Report on the Scaling of the 2025 NSW Higher School Certificate".
 * https://uac.edu.au/media-centre/publications/report-on-the-scaling-of-the-2025-nsw-higher-school-certificate
 *
 * TABLE_A3: Table A3 "Descriptive statistics and selected percentiles for HSC marks and
 * scaled marks by course" (pp. 41-45). Marks are per unit (0-50).
 * Format: name | number | HSC mean,sd,max,P99,P90,P75,P50,P25 | scaled mean,sd,max,P99,P90,P75,P50,P25
 *
 * TABLE_A9: Table A9 "Relationship between the ATAR and aggregates", 2025 column (p. 60):
 * the lowest aggregate (out of 500) for selected ATARs. Lower points from Table 3.2 (p. 13).
 *
 * Update both every year when UAC publishes the new report (usually in February).
 */
export const DATA_YEAR = 2025;

export const TABLE_A3 = `
Aboriginal Studies|827|35.3,8.4,49.5,49,45,41.5,36.5,30|14.8,12.4,44.3,42.6,33.8,23.6,11,4
Agriculture|1509|36.7,6.7,50,48,45.5,41.5,37.5,32|19.1,11.1,45.2,41.6,35.4,27.8,18.7,9.6
Ancient History|7495|36.4,7.1,50,47.5,44.5,41.5,37.5,32|22.4,11,48.8,44.4,37.4,30.9,22.5,13.7
Biology|20710|36.7,6.3,49.5,47,44,41.5,37.5,33|26.2,10.5,50,45.3,39.9,34.8,26.7,18
Business Studies|20452|37.4,6,49.5,48,45,42,37.5,33|23.9,11,50,45.6,39.2,32.6,23.4,15.1
Chemistry|10369|37.6,5.8,49,47.5,45,42,38,34|32,9.9,50,47.6,43.6,39.8,33.9,25.8
Community & Family Studies|9838|37.2,5.1,48.5,46.5,43.5,41,37.5,34|18.5,10.5,44,40.4,33.3,26.7,17.8,9.7
Dance|845|41.7,4.2,50,49,47,44.5,42.5,39|23.9,11.2,46.6,44.4,39.6,32.5,24.3,15.2
Design & Technology|4124|39.4,4.5,49.5,48,45,42.5,39.5,36.5|23.1,10.2,47.8,45.1,37.1,30.8,22.7,15.1
Drama|3191|40.8,4.9,50,49,47,44.5,41,37.5|24,11.6,50,47.2,40.7,33,23.4,14.6
Earth & Environmental Science|2678|37.3,6,50,47.5,44,41.5,38,33.5|22.8,10.9,48.3,43.4,37.1,31.5,23.2,13.9
Economics|5741|39,5.8,50,48,45.5,43.5,40,35.5|31.4,9.9,50,47.1,43,38.9,33,25
Engineering Studies|2558|36.8,5.6,49.5,47.5,44.5,40.5,37,33.5|26.2,10,49.5,45.9,39.6,33.6,26.4,18.6
English Standard|33651|36,3.7,49,44,40,38.5,36.5,34|20.4,8.2,49.3,39.7,31.5,26.1,20,14.5
English Advanced|26292|41.1,3.3,49.5,47.5,45.5,43.5,41,39|32.8,8,50,46.9,42.6,38.9,33.7,27.7
English EAL/D|1504|35.4,6.1,49.5,47,43,39.5,35.5,32|21.3,11.3,48.6,45.3,37.6,30.3,20,12.1
English Extension 1|3691|42.8,4.5,50,49,47,46,44,41|36.1,6.7,50,48.3,43.9,40.9,36.9,32.2
English Extension 2|1423|41.5,5.3,50,49,48,46,42,38|35.8,6.6,50,48.1,44,40.5,36.5,31.9
Enterprise Computing|1869|37,5.3,49.5,46.5,43.5,40.5,37.5,34|23.8,10.9,50,46.1,39.1,31.7,23.7,15.6
Food Technology|4187|36.8,5.8,49.5,48,44.5,41,37,32.5|18.9,11.3,45.9,43.3,35.6,27.3,17.6,9.3
Geography|4419|38,6,49.5,48,45.5,42.5,38.5,34|25.2,11.4,50,47.3,40.5,34.1,25.4,16.5
Industrial Technology|5999|35.6,5.8,50,48,44,39.5,35.5,31.5|17.7,10.2,42.3,39.6,32.7,25.4,16.6,9.1
Investigating Science|3292|37.8,5.3,49,47,44.5,41.5,38,34|20.5,10.9,46.9,42.8,35.5,28.9,20,11.5
Legal Studies|10080|37.8,6.6,49.5,48,45.5,43,39,33|25.3,11.2,50,45.7,39.9,34.4,25.9,16.5
Mathematics Standard 2|31762|36,6.6,49.5,47.5,44.5,40.5,36.5,32|23.3,10.2,47.1,42.9,37.3,31.5,23.2,15.1
Mathematics Advanced|16809|39.6,6.1,50,49,47,44.5,40,36|31.9,9.4,50,47.5,42.9,38.9,33.2,25.9
Mathematics Extension 1|9279|39.7,8,50,49.5,48,46,42,35|39.7,7.5,50,49.5,47.2,44.9,41.5,36.6
Mathematics Extension 2|3844|41.5,6.3,50,49.5,48,46.5,43.5,37.5|43.4,5.3,50,49.6,48.3,46.9,44.7,41.5
Modern History|10953|37.1,6.5,49.5,47.5,45,41.5,38,33.5|25,11.1,50,46,39.2,33.7,25.8,16.6
History Extension|1777|40.5,5.2,49,48,47,45,41,37|32.7,7.7,50,47,42.7,38.1,32.9,27.6
Music 1|4681|40.9,5.1,49.5,48.5,46.5,44.5,42,38.5|20.8,11,46.7,43.8,36.4,29,20.4,12
Music 2|762|43.7,3.2,50,49.5,48,46,44,41|34.1,8.5,50,48.7,44.9,40.8,35.1,27.6
Music Extension|447|46.2,4.1,50,50,50,49,47,45|35.9,10.3,50,50,49.6,45.2,36.3,29.4
PDH&PE|17852|37.3,5.5,49,47,44.5,41.5,37.5,33.5|22.8,10.8,48.6,43.5,37.3,31.3,22.8,14.2
Physics|8817|37,6.4,49,47.5,45.5,42,37.5,32|31,9.9,50,47.2,43,38.8,32.2,24
Science Extension|855|37.6,5,49,47,44,41,38,35|32,7.2,49.3,46.4,41,37.1,32.5,27.2
Society & Culture|4957|38.9,5.2,49.5,48,45.5,42.5,39.5,36|23.1,10.7,48.2,44.9,37.7,31.3,23.1,14.7
Software Engineering|1768|37.6,5.6,49,48,44.5,41.5,38,34.5|26.7,10.3,50,47.3,40.5,34.6,27.2,19
Studies of Religion I|8169|38.8,5.4,50,48,46,43,39,35|27.7,9.3,48.8,45.2,39.9,34.8,28.1,20.8
Studies of Religion II|6731|38.9,5.4,49.5,48,45,43,39.5,36|27.3,10.3,50,46,40.5,35.4,28.1,19.7
Textiles & Design|1482|38.9,5.6,49,48,46,43.5,39.5,35|22.8,11.2,48.5,45.6,38.3,31.5,22.4,13.8
Visual Arts|9047|40.9,3.9,50,48,45.5,44,41.5,38.5|21.7,11.2,48.7,45.3,37.4,30.1,21.1,12.6
Chinese Beginners|56|39.3,8.7,49.5,49.5,48.5,47.5,42,32|23.8,12.2,48.1,48.1,39,34.7,23.3,14.2
Chinese Continuers|334|43.5,5,49.5,49.5,48.5,47.5,45.5,40.5|32.8,9.6,50,48.6,43.5,40.2,35,26
Chinese Extension|106|44.6,3.5,49,49,48,47,46,43|37.3,5.4,50,48.3,44.4,41.2,37.5,33.6
French Beginners|341|38.2,7,48.5,48,46.5,44,39,34.5|24.7,11,49.2,47,40.1,33.2,24,16.8
French Continuers|520|41.2,4.6,49.5,49,47,45,41.5,38|34.4,8,50,48,44.2,40.5,35.4,29.7
French Extension|104|40.3,4.7,48,48,46,44,40,37|38.9,6.2,50,50,47,43.3,38.5,34.5
German Continuers|173|41.1,4.8,49.5,49,47.5,45.5,41,38|33.7,9,50,48.9,45.1,41.1,34.2,28.5
Italian Continuers|191|41.7,4.7,49,49,47,44.5,43,39|32.2,9.9,50,49.6,45,38.8,33.9,24.9
Japanese Beginners|357|35.6,8.8,49.5,47.5,45.5,42.5,37,31|24.1,11.7,48.8,44.2,40.1,33.5,24.8,14.9
Japanese Continuers|794|39.7,6.2,50,49,47,44.5,40.5,36|30.8,9.6,50,47.6,42.4,38.1,32.1,25.1
Japanese Extension|134|43.6,4.1,49,49,48,47,45,42|38,5.2,50,48.3,45,41.2,38,34.7
Korean Beginners|110|41.4,5.6,49.5,49.5,48,46,41.5,38|27.7,11.1,49.2,49,42.8,36.1,26.1,19.8
Latin Continuers|140|44.1,4.4,50,49.5,48.5,47.5,45.5,42|40.5,7.3,50,49,47.7,46.1,42.6,37.3
Spanish Beginners|286|40.3,6.3,49.5,49,48,45.5,41.5,36|25.7,12.2,50,47.9,42.3,35.5,26,16.6
Spanish Continuers|180|40.6,5.1,49,49,47,44.5,41.5,36.5|26.6,9.8,47.4,46.8,39,33.3,28,19.8
Vietnamese Continuers|218|39.8,3.5,47.5,46.5,43.5,42.5,40,37.5|17.9,9.5,41.1,40.3,30.7,25.1,16.3,10.2
`;

/** [aggregate out of 500, ATAR], ascending. */
export const AGGREGATE_TO_ATAR: [number, number][] = [
  [150.0, 46.8], // Table 3.2
  [165.7, 50.0],
  [190.0, 55.0],
  [212.9, 60.0],
  [237.2, 65.0],
  [262.0, 70.0],
  [287.5, 75.0],
  [313.8, 80.0],
  [341.6, 85.0],
  [370.7, 90.0],
  [404.6, 95.0],
  [433.2, 98.0],
  [447.8, 99.0],
  [459.4, 99.5],
  [479.4, 99.95],
];

/**
 * Source: NESA, "Performance bands" (HSC facts and figures), 2025 HSC, nsw.gov.au, data as at 19 January 2026.
 * https://www.nsw.gov.au/education-and-training/nesa/hsc/facts-and-figures/performance-bands
 * English Advanced uses the 2-decimal figures from NESA's band distribution page (BDHSC_2025_12_15140).
 *
 * Percentage of students in each band, lowest band first:
 * 2-unit courses: Band 1 (0-49), 2 (50-59), 3 (60-69), 4 (70-79), 5 (80-89), 6 (90-100), marks out of 100.
 * Extension courses: E1 (0-24), E2 (25-34), E3 (35-44), E4 (45-50), marks out of 50.
 * UAC's Table A3 has no percentiles below the 25th, so these set where low marks sit in each course.
 */
export const BANDS: Record<string, number[]> = {
  "English Advanced": [0.01, 0.25, 3.01, 31.5, 51.78, 13.46],
  "English Standard": [0, 5, 26, 55, 12, 0],
  "Mathematics Advanced": [2, 4, 14, 29, 28, 23],
  "Mathematics Standard 2": [4, 12, 23, 30, 21, 9],
  "Mathematics Extension 1": [5, 18, 43, 35],
  "Mathematics Extension 2": [1, 14, 43, 41],
  Physics: [2, 14, 21, 26, 25, 13],
  Chemistry: [2, 9, 19, 33, 27, 11],
  Biology: [4, 10, 21, 30, 28, 7],
  Economics: [1, 6, 15, 25, 38, 14],
  "Business Studies": [2, 9, 22, 29, 26, 12],
  "Legal Studies": [3, 10, 19, 24, 29, 15],
  "Modern History": [4, 9, 18, 34, 26, 10],
  "Ancient History": [5, 12, 17, 30, 27, 9],
  "PDH&PE": [1, 8, 23, 33, 27, 9],
  "English Extension 1": [0, 4, 53, 42],
  "English Extension 2": [0, 11, 54, 35],
  "Chinese Continuers": [0, 1, 7, 13, 24, 55],
  Geography: [2, 8, 17, 30, 30, 12],
  "Studies of Religion II": [1, 5, 14, 31, 36, 13],
  "Studies of Religion I": [1, 4, 15, 34, 31, 16],
  "Visual Arts": [0, 1, 7, 28, 48, 16],
  "Society & Culture": [1, 4, 13, 35, 35, 12],
  "Engineering Studies": [2, 6, 27, 36, 20, 9],
  "Software Engineering": [2, 6, 19, 37, 28, 8],
  "Earth & Environmental Science": [3, 8, 19, 32, 30, 8],
  "Investigating Science": [1, 5, 22, 33, 31, 8],
  "Community & Family Studies": [1, 7, 21, 38, 28, 5],
  "Design & Technology": [0, 2, 13, 36, 38, 11],
  "Food Technology": [2, 10, 25, 31, 24, 9],
  "Japanese Continuers": [1, 5, 14, 24, 33, 23],
  "French Continuers": [0, 1, 8, 28, 35, 28],
  "Music 1": [1, 4, 8, 20, 45, 22],
  "Music 2": [0, 0, 0, 14, 46, 40],
  Drama: [0, 2, 9, 31, 35, 23],
  Dance: [0, 1, 7, 22, 48, 22],
  "English EAL/D": [4, 10, 29, 33, 19, 5],
  "Enterprise Computing": [3, 6, 20, 41, 25, 5],
  "Industrial Technology": [2, 13, 31, 31, 15, 8],
  "Aboriginal Studies": [11, 13, 18, 23, 24, 11],
  Agriculture: [4, 11, 22, 28, 23, 11],
  "Textiles & Design": [1, 5, 16, 29, 32, 16],
  "Science Extension": [1, 22, 69, 7],
  "History Extension": [1, 12, 62, 26],
};
