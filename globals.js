class GlobalsManager {
    
    constructor() {
      this.mainWindow = null;
      this.imageStorage = [];
    }
  
    // setMainWindow(mainWindow) {
    //   this.mainWindow = mainWindow;
    // }
  
    // getMainWindow() {
    //   return this.mainWindow;
    // }
  }
  
  const singleton = new GlobalsManager();
//   Object.freeze(singleton);
  
  module.exports = singleton;
  