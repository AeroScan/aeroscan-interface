import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });

export const LoadCloud = async (dataForm) => {
    
    const response = await api.post('/file', dataForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    })
    return response;
}

export const SaveCloud = async () => {

    const response = await api.get('/file');
    console.log(response)
    return response;
}

export const GenerateCad = async () => {
    const response = await api.get('/generateCad');
    if (response.data.error) {
        console.err(response.data.message)
        return false;
    }
    return !response.data.error;
}

export const ApplyCropBox = async ({
    min_x, min_y, min_z,
    max_x, max_y, max_z,
}) => {
    const response = await api.post('/preProcessing', {
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
        console.err(response.data.message)
        return false;
    }
    return response.data.folderName;
}

export const ApplyVoxelGrid = async ({ leaf }) => {
    const response = await api.post('/preProcessing', {
        function_type: "voxel_grid",
        values: { leaf: leaf },
    });
    if (response.data.error) {
        console.err(response.data.message)
        return false;
    }
    return response.data.folderName;
}

export const ApplyStatisticalOutlierRemoval = async ({ mean, std }) => {
    const response = await api.post('/preProcessing', {
        function_type: "statistical_removal",
        values: {
            mean: mean,
            std: std,
        },
    });
    if (response.data.error) {
        console.err(response.data.message)
        return false;
    }
    return response.data.folderName;
}

export const ApplyNormalEstimation = async ({ radius }) => {
    const response = await api.post('/preProcessing', {
        function_type: "normal_estimation",
        values: { radius: radius },
    });
    if (response.data.error) {
        console.err(response.data.message)
        return false;
    }
    return response.data.folderName;
}

export const ApplyReescale = async ({ factor }) => {
    const response = await api.post('/preProcessing', {
        function_type: "reescale",
        values: { factor: factor },
    });
    if (response.data.error) {
        console.err(response.data.message)
        return false;
    }
    return response.data.folderName;
}

export const ApplyAlignment = async () => {
    const response = await api.post('/preProcessing', { function_type: "alignment" });
    if (response.data.error) {
        console.err(response.data.message)
        return false;
    }
    return response.data.folderName;
}

export const ApplyCentralization = async () => {
    const response = await api.post('/preProcessing', { function_type: "centralization" });
    if (response.data.error) {
        console.err(response.data.message)
        return false;
    }
    return response.data.folderName;
}

export const ApplyNoiseAdd = async ({ limit }) => {
    const response = await api.post('/preProcessing', {
        function_type: "noise_add",
        values: { limit: limit },
    });
    if (response.data.error) {
        console.err(response.data.message)
        return false;
    }
    return response.data.folderName;
}

export const ApplyCubeReescale = async ({ factor }) => {
    const response = await api.post('/preProcessing', {
        function_type: "cube_reescale",
        values: { factor: factor },
    });
    if (response.data.error) {
        console.err(response.data.message)
        return false;
    }
    return response.data.folderName;
}

export const ApplyEfficientRansac = async ({
    probability,
    min_points,
    epsilon,
    cluster_epsilon,
    normal_threshold,
}) => {
    const response = await api.post('/effRansac', {
        probability: probability,
        min_points: min_points,
        epsilon: epsilon,
        cluster_epsilon: cluster_epsilon,
        normal_threshold: normal_threshold,
    });
    if (response.data.error) {
        console.err(response.data.message)
        return false;
    }
    return response.data.folderName;
}

export default api;