import { getReport } from "../services/report.service.js";

export const getReportHandler = async (req, res, next) => {
  try {
    const data = await getReport();

    return res.status(200).json({
      message: "Report fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};
