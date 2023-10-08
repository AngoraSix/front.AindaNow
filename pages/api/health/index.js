const page = async (req, res) => {
  console.log("CHECKING HEALTH!");
  console.log(req.method);
  if (req.method === 'GET') {
    console.log("CHecking Health with GET");
    res.status(200);
  }
};

export default page;
