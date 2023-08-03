const tooltipsTexts = {
  cropbox: {
    text: "The Crop Box filter can me applied to crop just the region of interest in the input point cloud. \
           The parameters must be hand-writed, but the values to be used can be choosed with help of the tool called Point measurement in the \
           point cloud visualization.",
    parameters: {
      starting_point: {
        text: "The starting_point parameter defines the minimum point of the Crop Box filter. \
               The three values represent, respectively, the minumum in x, y and z coordinates. \
               Range and unity of measurament are directly dependent of the point cloud. \
               To tune this parameter, go to the point cloud visualization, select the minimum point to be considered in the region of interest \
               and write its coordinates here.",
      },
      ending_point: {
        text: "The ending_point parameter defines the maximum point of the Crop Box filter. \
               The three values represent, respectively, the maximum in x, y and z coordinates. \
               Range and unity of measurament are directly dependent of the point cloud. \
               To tune this parameter, go to the point cloud visualization, select the maximum point to be considered in the region of interest \
               and write its coordinates here.",
      },
    }
  },
  voxel_grid: {
    leaf_size: "",
  }
};

export default tooltipsTexts;
