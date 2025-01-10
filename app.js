async function fetchBucketContents() {
    const response = await fetch('https://4626da2aef7b96cdab6222985b5187b8.r2.cloudflarestorage.com/primary', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    displayBucketContents(data);
}

function displayBucketContents(data) {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = '';
    data.objects.forEach(object => {
        const objectDiv = document.createElement('div');
        objectDiv.textContent = object.key;
        appDiv.appendChild(objectDiv);
    });
}

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://4626da2aef7b96cdab6222985b5187b8.r2.cloudflarestorage.com/primary', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        },
        body: formData
    });

    if (response.ok) {
        fetchBucketContents();
    } else {
        console.error('Failed to upload file');
    }
}

async function deleteFile(fileName) {
    const response = await fetch(`https://4626da2aef7b96cdab6222985b5187b8.r2.cloudflarestorage.com/primary/${fileName}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        }
    });

    if (response.ok) {
        fetchBucketContents();
    } else {
        console.error('Failed to delete file');
    }
}

async function renameFile(oldFileName, newFileName) {
    const response = await fetch(`https://4626da2aef7b96cdab6222985b5187b8.r2.cloudflarestorage.com/primary/${oldFileName}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: newFileName })
    });

    if (response.ok) {
        fetchBucketContents();
    } else {
        console.error('Failed to rename file');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchBucketContents();
});
