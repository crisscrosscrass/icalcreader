class ICalendarManager {
    constructor() {
        this.downloadButton = document.getElementById("downloadFile");
        this.processDownloadButton = document.getElementById("processDownload");
        this.startDate = document.getElementById('startDate').value;
        this.calendarUrl = document.getElementById('calendarURL').value;
        document.querySelectorAll('.card-group').length == 0 ? this.downloaded = false : this.downloaded = true;
        this.calendarUrl.length < 5 ? alert("Please enter the URL for the Persionio") : this.init();
    }
    init() {
        this.showProcessing();

        // Set up our HTTP request
        var xhr = new XMLHttpRequest();
        var url = '/download_file';
        var data = `startDate=${this.startDate}&calendarUrl=${this.calendarUrl}&downloaded=${this.downloaded}`;

        // Setup our listener to process completed requests
        xhr.onload = () => {

            // Process our return data
            if (xhr.status >= 200 && xhr.status < 300) {
                // What do when the request is successful
                // console.log('success!', xhr);
                let response = JSON.parse(xhr.responseText);
                if (response.detectedFile.status) {
                    this.showResults(response.detectedFile.arrayCollection);
                } else {
                    let response = JSON.parse(xhr.responseText);
                    console.log(response.detectedFile);
                }
            } else {
                // What do when the request fails
                console.log('The request failed!');
                let response = JSON.parse(xhr.responseText);
                console.log(response.detectedFile);
            }

            // Code that run regardless of the request status
            this.stopShowProcessing();
        };

        // Create and send a GET request
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    showResults(arrayCollection) {
        let colors = ["info", "success", "secondary", "primary"];
        let outcome = document.getElementById('outcome');
        let temp = '';
        temp = `<h6>Readed <span class="text-danger">${arrayCollection.events}</span> calendar events</h6>`;
        temp += `<div class="card-group">`;
        for (const [index, [key, value]] of Object.entries(Object.entries(arrayCollection))) {
            if (key != 'events') {
                temp += `<div class="card border-${colors[index]} mb-3" style="max-width: 18rem;">
            <div class="card-header">
                <div class="btn btn-${colors[index]}">
                    ${key} <span class="badge badge-light">${value.length}</span>
                </div>
            </div>
            <div class="card-body text-${colors[index]}">
                <h5 class="card-title">Attendees</h5>
                <p class="card-text">${value}</p>
            </div>
        </div>`;
            }
        }
        temp += `</div>`;
        outcome.innerHTML = temp;
    }
    showProcessing() {
        this.downloadButton.style.display = 'none';
        this.processDownloadButton.style.display = 'initial';
    }
    stopShowProcessing() {
        this.processDownloadButton.style.display = 'none';
        this.downloadButton.style.display = 'initial';
    }
}