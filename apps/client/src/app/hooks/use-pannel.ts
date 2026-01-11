export const usePannel = (open: boolean, min: number, max: number) => {
  const pannelWidth = open ? max : min;

  //   main_transform_style
  const mainTransform = {
    transform: `translateX(${pannelWidth}px)`,
    width: `calc(100% - ${pannelWidth}px)`,
  };

  return { pannelWidth, mainTransform };
};
