const tooltipsTexts = {
  alignment: {
    text: "The Alignment filter can be applied to align the input point cloud to a reference point cloud. The reference point cloud must be loaded in the point cloud visualization. The parameters must be hand-writed, but the values to be used can be choosed with help of the tool called Point measurement in the point cloud visualization.",
  },
  centralization: {
    text: "The Centralization filter can be applied to centralize the input point cloud. The parameters must be hand-writed, but the values to be used can be choosed with help of the tool called Point measurement in the point cloud visualization.",
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
    text: "The Cube Rescale filter can be applied to rescale the input point cloud to a cube with a given size. The parameters must be hand-writed, but the values to be used can be choosed with help of the tool called Point measurement in the point cloud visualization.",
    parameters: {
      factor: {
        text: "The factor parameter defines the size of the cube to be rescaled. The value represents the size of the cube in meters. To tune this parameter, go to the point cloud visualization, select two points in the point cloud and write the distance between them here.",
      },
    },
  },
  efficient_ransac: {
    text: "The Efficient RANSAC filter can be applied to segment the input point cloud in two parts: inliers and outliers. The parameters must be hand-writed, but the values to be used can be choosed with help of the tool called Point measurement in the point cloud visualization.",
    parameters: {
      probability: {
        text: "The probability parameter defines the probability of a point to be considered an inlier. The value represents the probability in percentage. To tune this parameter, go to the point cloud visualization, select a point in the point cloud and write the probability of this point to be considered an inlier here.",
      },
      min_points: {
        text: "The min_points parameter defines the minimum number of points to be considered in the segmentation. To tune this parameter, go to the point cloud visualization, select a region of interest and write the number of points in this region here.",
      },
      cluster_epsilon: {
        text: "The cluster_epsilon parameter defines the maximum distance between two points to be considered in the same cluster. The value represents the distance in meters. To tune this parameter, go to the point cloud visualization, select two points in the point cloud and write the distance between them here.",
      },
      epsilon: {
        text: "The epsilon parameter defines the maximum distance between a point and a plane to be considered an inlier. The value represents the distance in meters. To tune this parameter, go to the point cloud visualization, select a point in the point cloud and write the distance between this point and the plane to be considered an inlier here.",
      },
      normal_threshold: {
        text: "The normal_threshold parameter defines the maximum angle between a point and a plane to be considered an inlier. The value represents the angle in degrees. To tune this parameter, go to the point cloud visualization, select a point in the point cloud and write the angle between this point and the plane to be considered an inlier here.",
      },
    },
  },
  noise_add: {
    text: "The Noise Add filter can be applied to add noise to the input point cloud. The parameters must be hand-writed, but the values to be used can be choosed with help of the tool called Point measurement in the point cloud visualization.",
    parameters: {
      limit: {
        text: "The limit parameter defines the maximum distance between a point and the original point to be considered a noise. The value represents the distance in meters. To tune this parameter, go to the point cloud visualization, select a point in the point cloud and write the distance between this point and the original point to be considered a noise here.",
      },
    },
  },
  normal_estimation: {
    text: "The Normal Estimation filter can be applied to estimate the normals of the input point cloud. The parameters must be hand-writed, but the values to be used can be choosed with help of the tool called Point measurement in the point cloud visualization.",
    parameters: {
      radius: {
        text: "The radius parameter defines the radius of the sphere to be considered in the normal estimation. The value represents the radius in meters. To tune this parameter, go to the point cloud visualization, select a point in the point cloud and write the radius of the sphere to be considered in the normal estimation here.",
      },
    },
  },
  rescale: {
    text: "The Rescale filter can be applied to rescale the input point cloud to a given size. The parameters must be hand-writed, but the values to be used can be choosed with help of the tool called Point measurement in the point cloud visualization.",
    parameters: {
      factor: {
        text: "The factor parameter defines the size of the point cloud to be rescaled. The value represents the size of the point cloud in meters. To tune this parameter, go to the point cloud visualization, select two points in the point cloud and write the distance between them here.",
      },
    },
  },
  statistical_removal: {
    text: "The Statistical Removal filter can be applied to remove the outliers of the input point cloud. The parameters must be hand-writed, but the values to be used can be choosed with help of the tool called Point measurement in the point cloud visualization.",
    parameters: {
      mean: {
        text: "The mean parameter defines the mean distance between a point and its neighbors to be considered an inlier. The value represents the distance in meters. To tune this parameter, go to the point cloud visualization, select a point in the point cloud and write the mean distance between this point and its neighbors to be considered an inlier here.",
      },
      standard_deviation: {
        text: "The standard_deviation parameter defines the standard deviation of the distance between a point and its neighbors to be considered an inlier. The value represents the distance in meters. To tune this parameter, go to the point cloud visualization, select a point in the point cloud and write the standard deviation of the distance between this point and its neighbors to be considered an inlier here.",
      },
    },
  },
  voxel_grid: {
    text: "The Voxel Grid filter can be applied to downsample the input point cloud. The parameters must be hand-writed, but the values to be used can be choosed with help of the tool called Point measurement in the point cloud visualization.",
    parameters: {
      leaf_size: {
        text: "The leaf_size parameter defines the size of the voxel grid to be used in the downsampling. The value represents the size of the voxel grid in meters. To tune this parameter, go to the point cloud visualization, select two points in the point cloud and write the distance between them here.",
      },
    },
  },
};

export default tooltipsTexts;
