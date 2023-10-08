const page = async (req, res) => {
  console.log("CHECKING HEALTH!");
  console.log(req.method);
  if (req.method === 'GET') {
    console.log("CHecking Health with GET");
    const healthData = {
      status: 'RUNNING',
    };
    res.status(200).json(healthData);
  }
};

export default page;
