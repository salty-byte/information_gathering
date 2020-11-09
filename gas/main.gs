function createEveryDay() {
  const appList = [];
  appList.push(new SecurityNextApp());
  appList.push(new ITmediaApp());

  for (const app of appList) {
    app.create();
  }
}

function uploadEveryDay() {
  const appList = [];
  appList.push(new SecurityNextApp());
  appList.push(new ITmediaApp());

  for (const app of appList) {
    app.upload();
  }
}
