export function correctDateFormat(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(dateString)) {
    console.log(dateString.replace(/-/g, "/"));
    return dateString.replace(/-/g, "/");
  } else {
    return dateString;
  }
}

export function appendImageToFormdata(image, field, formData) {
  if (image) {
    const parts = image.split(".");
    const filext = parts[parts.length - 1].toLowerCase();
    const filename = Math.floor(Math.random() * 1000000000);
    formData.append(field, {
      uri: image,
      name: `${filename}.${filext}`,
      type: "image/jpeg",
    });
  }
  return formData;
}
