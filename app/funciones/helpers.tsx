export const returnScreenSize = () => {
    const width = window.innerWidth
    if(width < 768){
      return "phone"
    }else if(width >= 768 && width < 1024){
      return "tablet"
    }else if(width >= 1024 && width < 1440){
      return "laptop"
    }else if(width >= 1440 ){
      return "desktop"
    }
  }