export const alumnusJsonToCsv = (alumni: Alumnus[]): (string | number)[][] =>
  alumni.map((alumnus) => [
    alumnus.group,
    alumnus.course,
    alumnus.name,
    alumnus.countryName,
    alumnus.paperTitle,
    alumnus.affiliationName,
    alumnus.subAffiliation,
    alumnus.address,
    alumnus.latitude,
    alumnus.longitude,
    alumnus.completionYear,
    alumnus.url,
    alumnus.email,
    alumnus.image,
  ])

export const alumnusCsvToJson = (data: string[][]): Alumnus[] =>
  data.map((datum) => ({
    group: datum[0] as "IISEE" | "ICHARM",
    course: datum[1],
    name: datum[2],
    countryName: datum[3] as CountryName,
    paperTitle: datum[4],
    affiliationName: campactString(datum[5]),
    subAffiliation: campactString(datum[6]),
    address: campactString(datum[7]),
    latitude: Number(datum[8]) || undefined,
    longitude: Number(datum[9]) || undefined,
    completionYear: Number(datum[10]),
    url: datum[11],
    email: campactString(datum[12]),
    image: campactString(datum[13]),
  }))

const campactString = (text: string): string | undefined =>
  !!text && text.length > 0 ? text : undefined
