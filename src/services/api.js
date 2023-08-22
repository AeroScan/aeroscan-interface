import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_API_PORT}/api`,
});

export const LoadCloud = async (dataForm) => {
  const response = await api.post("/uploadCloud", dataForm, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(JSON.parse(response.data.params_suggestion));
  return response;
};

export const SaveCloud = async ({ session }) => {
  const response = await api.get(`/download/${session}`);
  return response;
};

export const SaveRansacResults = async ({ sessionId }) => {
  const response = await api.get(`/getRansacResults/${sessionId}`);
  if (response.data.error) {
    console.err(response.data.message);
    return false;
  }
  return response;
};

export const ApplyCropBox = async ({
  session,
  uuid,
  min_x,
  min_y,
  min_z,
  max_x,
  max_y,
  max_z,
}) => {
  const response = await api.post("/preProcessing", {
    uuid: uuid,
    session: session,
    function_type: "crop_box",
    values: {
      min_x: min_x,
      min_y: min_y,
      min_z: min_z,
      max_x: max_x,
      max_y: max_y,
      max_z: max_z,
    },
  });
  if (response.data.error) {
    console.err(response.data.message);
    return false;
  }
  return response.data.uuid;
};

export const ApplyVoxelGrid = async ({ session, uuid, leaf }) => {
  const response = await api.post("/preProcessing", {
    uuid: uuid,
    session: session,
    function_type: "voxel_grid",
    values: { leaf: leaf },
  });
  if (response.data.error) {
    console.err(response.data.message);
    return false;
  }
  return response.data.uuid;
};

export const ApplyStatisticalOutlierRemoval = async ({
  session,
  uuid,
  mean,
  std,
}) => {
  const response = await api.post("/preProcessing", {
    uuid: uuid,
    session: session,
    function_type: "statistical_removal",
    values: {
      mean: mean,
      std: std,
    },
  });
  if (response.data.error) {
    console.err(response.data.message);
    return false;
  }
  return response.data.uuid;
};

export const ApplyNormalEstimation = async ({ session, uuid, radius }) => {
  const response = await api.post("/preProcessing", {
    uuid: uuid,
    session: session,
    function_type: "normal_estimation",
    values: { radius: radius },
  });
  if (response.data.error) {
    console.err(response.data.message);
    return false;
  }
  return response.data.uuid;
};

export const ApplyReescale = async ({ session, uuid, factor }) => {
  const response = await api.post("/preProcessing", {
    uuid: uuid,
    session: session,
    function_type: "reescale",
    values: { factor: factor },
  });
  if (response.data.error) {
    console.err(response.data.message);
    return false;
  }
  return response.data.uuid;
};

export const ApplyAlignment = async ({ session, uuid }) => {
  const response = await api.post("/preProcessing", {
    uuid: uuid,
    session: session,
    function_type: "alignment",
  });
  if (response.data.error) {
    console.err(response.data.message);
    return false;
  }
  return response.data.uuid;
};

export const ApplyCentralization = async ({ session, uuid }) => {
  const response = await api.post("/preProcessing", {
    uuid: uuid,
    session: session,
    function_type: "centralization",
  });
  if (response.data.error) {
    console.err(response.data.message);
    return false;
  }
  return response.data.uuid;
};

export const ApplyNoiseAdd = async ({ session, uuid, limit }) => {
  const response = await api.post("/preProcessing", {
    uuid: uuid,
    session: session,
    function_type: "noise_add",
    values: { limit: limit },
  });
  if (response.data.error) {
    console.err(response.data.message);
    return false;
  }
  return response.data.uuid;
};

export const ApplyCubeReescale = async ({ session, uuid, factor }) => {
  const response = await api.post("/preProcessing", {
    uuid: uuid,
    session: session,
    function_type: "cube_reescale",
    values: { factor: factor },
  });
  if (response.data.error) {
    console.err(response.data.message);
    return false;
  }
  return response.data.uuid;
};

export const ApplyEfficientRansac = async ({
  session,
  uuid,
  probability,
  min_points,
  epsilon,
  cluster_epsilon,
  normal_threshold,
}) => {
  const response = await api.post("/effRansac", {
    uuid: uuid,
    session: session,
    values: {
      probability: probability,
      min_points: min_points,
      epsilon: epsilon,
      cluster_epsilon: cluster_epsilon,
      normal_threshold: normal_threshold,
    },
  });
  if (response.data.error) {
    console.err(response.data.message);
    return false;
  }
  return response.data.uuid;
};

export default api;

