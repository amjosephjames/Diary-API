const userModel = require("../model/userModel");
const diaryModel = require("../model/diaryModel");

const createDiary = async (req, res) => {
  try {
    const { title, description } = req.body;
    const getUser = await userModel.findById(req.params.id);

    const getDiary = await diaryModel.create({
      title,
      description,
    });
    getDiary.user = getUser;
    getDiary.save();
    getUser?.diary.push(new mongoose.Types.ObjectId(getDiary._id));
    getUser?.save();
    return res.status(201).json({
      message: "diary created",
      data: getDiary,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteDiary = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id);

    const removeData = await diaryModel.findByIdAndRemove(req.params.diary);

    getUser.diary.pull(removeData);
    getUser.save();

    res.status(201).json({ message: "created", data: getUser });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const getDiary = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate("diary");

    res.status(200).json({ message: "success", data: getUser });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateDiary = async (req, res) => {
  try {
    const { title, message } = req.body;
    const updateData = await diaryModel.findByIdAndUpdate(
      req.params.diary,
      { title, message },
      { new: true }
    );

    res.status(201).json({ message: "updated Data", data: updateData });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getOneDiary = async (req, res) => {
  try {
    const diaryData = await diaryModel.findById(req.params.diary);

    res.status(201).json({ message: "found single Diary", data: diaryData });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  createDiary,
  getDiary,
  updateDiary,
  getOneDiary,
  deleteDiary,
};
