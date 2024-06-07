export function parseSearch(search) {
  if (search === "") {
    return "Search can't be empty";
  }

  if (search.length < 3) {
    return "Search must have at least 3 characters";
  }

  return null;
}
