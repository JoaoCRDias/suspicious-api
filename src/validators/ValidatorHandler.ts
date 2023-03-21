export const validate = (schema: any) => (req: any, res: any, next: any) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(422).send(error.details[0].message);
  } else {
    next();
  }
};
