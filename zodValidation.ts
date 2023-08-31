import { z } from "zod";
{
  const validation = () => {
    const jsonPersons = `
  [
    {"name":"Jens","age":37,"address":{"street":"Gatanvägen 32","zipCode":12345,"city":"Storstaden","country":"Sweden"},"email":"jens@jens.se","phone":"0701234567","shoeSize":42},
    {"name":"Kalle","age":22,"address":{"street":"Väggatan 12","zipCode":12345,"city":"Storstaden","country":"Sweden"},"phone":"070-1234567","shoeSize":46},
    {"name":"Lotta","age":47,"address":{"street":"","zipCode":12345,"city":"Storstaden","country":"Sweden"},"email":"jens@jens.se"},
    {"name":"Stina","age":-5,"address":{"street":"Stiggränd 6","zipCode":12345,"city":"Storstaden","country":"Sweden"},"shoeSize":28},
    {"name":"Benke","age":0,"address":{"street":"Alleyway 23","city":"Dublin","country":"Ireland"},"email":"@benke.se","phone":"+46701234567","shoeSize":5, "schoolName": "Superskolan AB"}
  ]
  `;
    const schema = z
      .object({
        name: z.string(),
        age: z.number().positive(),
        address: z.object({
          street: z.string().min(2),
          zipCode: z.number().min(10000).max(99999),
          city: z.string().min(2),
          country: z.string().min(2),
        }),
        email: z.string().email().optional(),
        phone: z
          .string()
          .regex(/^(\+[0-9]{2,3})?[0-9-]{9,11}/)
          .optional(),
        shoeSize: z.number().min(15).max(60).optional(),
      })
      .strict()
      .refine(
        ({ email, phone }) => email !== undefined || phone !== undefined,
        {
          message: "Either phone or email needs to be valid",
        }
      );

    type Person = z.infer<typeof schema>;

    const persons: Person[] = JSON.parse(jsonPersons);
    let results: any[] = [];
    for (const person of persons) {
      results.push(schema.safeParse(person));
    }
    results.forEach((result) =>
      result.error
        ? console.log(result.error + result.error.path)
        : console.log(result.data)
    );
  };

  validation();
}
