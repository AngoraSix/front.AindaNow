const page = async (req, res) => {
  if (req.method === 'GET') {
    const healthData = {
      status: 'RUNNING',
    };
    res.status(200).json(healthData);
  }
};

export default page;
