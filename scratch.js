var url = "https://youtu.be/CfnFir_0VWk"

urlObject = new URL(url);

urlObject.pathname.split("/").pop().split("?")[0].split("#")[0]
