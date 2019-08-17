function reduceTo(number, reducedTo) {
  if (number <= reducedTo) {
    return number;
  }
  return reduceTo(number - reducedTo - 1, reducedTo);
}

export default reduceTo;
