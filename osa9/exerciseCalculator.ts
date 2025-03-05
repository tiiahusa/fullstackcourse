interface EXCalculator {
    hours: Array<number>;
    target: number;
  }

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }

  const parseEXArguments = (args: string[]): EXCalculator => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2]);
    const hours = args.slice(3).map(arg => {
      const num = Number(arg);
      if (isNaN(num)) {
        throw new Error('Provided values were not numbers!');
      }
      return num;
    });
  
    return {
      target,
      hours
    };
  }
  
  const calculateEx = (hours: Array<number>, target: number): Result => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h > 0).length;
    const average = hours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    
    let rating: number;
    let ratingDescription: string;
  
    if (average >= target) {
      rating = 3;
      ratingDescription = "excellent! you met your target";
    } else if (average >= target * 0.75) {
      rating = 2;
      ratingDescription = "not too bad but could be better";
    } else {
      rating = 1;
      ratingDescription = "you have to work harder";
    }
  
    const result: Result = {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  
    return result;
  }
  
  try {
    const { target, hours } = parseEXArguments(process.argv);
    console.log(calculateEx(hours, target))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }