interface CalculateBMI {
    height: number;
    weight: number;
  }

  const parseBMIArguments = (args: string[]): CalculateBMI => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  
  const calculateBmi = (height: number, weight: number): string => {
    let convertedHeight = height/100
    let bmi = weight / (convertedHeight^2)
    switch(true) {
        case (bmi < 18.5):
            return "Under norman range";
        case (bmi >= 18.5 && bmi < 24.9):
            return "Normal range";
        case (bmi >= 25 && bmi < 29.9):
            return "Over normal range";
        case (bmi >= 30):
            return "Obesity";
        default:
            return "Invalid BMI";
    }
  }
  
  try {
    const { height, weight } = parseBMIArguments(process.argv);
    console.log(calculateBmi(height, weight))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }