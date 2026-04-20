export const jobQueue = [];

export const addJob = (job) => {
  jobQueue.push({
    id: Date.now() + Math.random(),
    retry: 0,
    ...job,
  });
};