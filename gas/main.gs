function createEveryDay() {
  const appList = [];
  appList.push(new SecurityNextApp());
  
  for (const app of appList) {
    app.create();
  }
}

function uploadEveryDay() {
  const appList = [];
  appList.push(new SecurityNextApp());
  
  for (const app of appList) {
    app.upload();
  }
}
