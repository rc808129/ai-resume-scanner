import { exec } from "child_process";

export const parseResume = (
  filePath: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    exec(
      `python ../python-service/process_resume.py ${filePath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }

        if (stderr) {
          reject(stderr);
          return;
        }

        resolve(JSON.parse(stdout));
      }
    );
  });
};