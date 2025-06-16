function getInitials(fullname: string) {
  if (!fullname) {
    return "";
  }
  return fullname
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default getInitials;
