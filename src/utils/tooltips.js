const tooltipsTexts = {
  alignment: {
    text: "The Alignment algorithm facilitates the precise alignment of the point cloud, ensuring it is aligned to the center of the coordinate system and orientation. After applying it, you can utilize the Point Measurement tool within the point cloud visualization to check this functionality.",
  },
  centralization: {
    text: "Centralization is the process of repositioning the point cloud within a centered coordinate system. After applying it, you can utilize the Point Measurement tool within the point cloud visualization to check this functionality.",
  },
  crop_box: {
    text: "The Crop Box filter can be applied to crop just the region of interest in the input point cloud. The parameters must be hand-writed, but the values to be used can be choosed with help of the tool called Point measurement in the point cloud visualization.",
    parameters: {
      starting_point: {
        text: "The starting_point parameter defines the minimum point of the Crop Box filter. The three values represent, respectively, the minumum in x, y and z coordinates. Range and unity of measurament are directly dependent of the point cloud. To tune this parameter, go to the point cloud visualization, select the minimum point to be considered in the region of interest and write its coordinates here.",
      },
      ending_point: {
        text: "The ending_point parameter defines the maximum point of the Crop Box filter. The three values represent, respectively, the maximum in x, y and z coordinates. Range and unity of measurament are directly dependent of the point cloud. To tune this parameter, go to the point cloud visualization, select the maximum point to be considered in the region of interest and write its coordinates here.",
      },
    },
  },
  cube_rescale: {
    text: "Cube Rescaling enables you to scale the point cloud to fit within a specified cubic region. Adjust the rescaling parameters manually or leverage the Point Measurement tool to determine the ideal values.",
    parameters: {
      factor: {
        text: "The factor parameter controls point cloud scaling relative to the specified cube size. Increase it (>1) for upscaling, decrease (0-1) for downscaling, or keep at 1 for original scale. Careful adjustment ensures accurate data representation.",
      },
    },
  },
  efficient_ransac: {
    text: "Efficient RANSAC is an optimized version of the Random Sample Consensus algorithm, used for robust model fitting in the presence of outliers. Customize the algorithm parameters manually for accurate results.",
    parameters: {
      probability: {
        text: "Probability controls the desired probability of finding a valid model. Lower values increase computation time but improve the likelihood of accurate results.",
      },
      min_points: {
        text: "Min Points specifies the minimum number of data points required to define a model. It influences the model's robustness and should be set according to data characteristics.",
      },
      cluster_epsilon: {
        text: "Cluster Epsilon defines the maximum distance between points in the same cluster. Adjust it to group points closely related to the detected model.",
      },
      epsilon: {
        text: "Epsilon determines the tolerance for point-to-model distance. Smaller values provide a tighter fit, while larger values allow for more flexibility.",
      },
      normal_threshold: {
        text: "Normal Threshold sets the threshold for accepting points based on their normal alignment with the model. Higher values require closer alignment, potentially filtering out noisy data.",
      },
    },
  },
  noise_add: {
    text: "The Noise Add algorithm introduces random perturbations to the point cloud data, simulating noisy conditions or supporting testing purposes. Configure noise parameters manually to achieve the desired level of noise.",
    parameters: {
      limit: {
        text: "The Limit parameter sets the upper bound for adding noise to the point cloud. It controls the maximum magnitude of perturbations introduced, ensuring noise remains within manageable limits for accurate data simulation.",
      },
    },
  },
  normal_estimation: {
    text: "Normal Estimation calculates surface normals for each point in the cloud, essential for surface analysis and feature detection. Adjust the estimation parameters manually for precise normal vectors.",
    parameters: {
      radius: {
        text: "The Radius parameter defines the search radius for neighboring points when estimating normals. A larger radius considers points farther from the target point, potentially resulting in smoother but less localized normals. A smaller radius limits the influence to nearby points, yielding more detailed, localized normal vectors. Adjust this parameter to suit the level of detail needed for your analysis.",
      },
    },
  },
  rescale: {
    text: "Rescaling allows you to adjust the scale of the point cloud to specific units or dimensions. Manually configure the rescaling parameters for accurate scaling results.",
    parameters: {
      factor: {
        text: "The Factor parameter determines the scaling factor applied to the entire point cloud. Use values greater than 1 for upscaling, values between 0 and 1 for downscaling, and set it to 1 to maintain the original scale. Carefully adjust this factor to control the overall size of the point cloud as needed for your analysis.",
      },
    },
  },
  statistical_removal: {
    text: "Statistical Removal is employed to filter out outlier points within the point cloud based on statistical criteria. Fine-tune the removal parameters manually to effectively remove unwanted data points.",
    parameters: {
      mean: {
        text: "The Mean parameter defines the expected mean value for the data distribution. Data points with values significantly deviating from this mean are considered outliers and may be removed during statistical filtering.",
      },
      standard_deviation: {
        text: "The Standard Deviation parameter specifies the acceptable range around the mean. Data points beyond this range are considered outliers and are subject to removal. A smaller standard deviation tightens the filter, while a larger one allows for a broader range of accepted values.",
      },
    },
  },
  voxel_grid: {
    text: "The Voxel Grid algorithm discretizes the point cloud into a 3D cubic structure for improved indexing and analysis. Manually specify the grid parameters to control voxel size and precision.",
    parameters: {
      leaf_size: {
        text: "The Leaf Size parameter determines the size of the voxels (3D cubes) used for discretizing the point cloud. A smaller leaf size results in smaller voxels, providing a more detailed representation but requiring more memory and computation. Conversely, a larger leaf size yields larger voxels, reducing memory and computation requirements but potentially losing fine-grained detail. Adjust this parameter to strike a balance between detail and efficiency for your analysis.",
      },
    },
  },
};

export default tooltipsTexts;
