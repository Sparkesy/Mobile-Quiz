import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import quizData from './quizData.json';

const Stack = createStackNavigator();

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeLabel}>Welcome to the Gaming Quiz!</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Quiz')}
      >
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const QuizScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleAnswer = (selectedAnswer) => {
    const currentAnswer = quizData[currentQuestion].answer;
    if (selectedAnswer === currentAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Quiz is finished, navigate to the score screen
      navigation.navigate('Score', { score, totalQuestions: quizData.length });
    }
  };

  const renderOptions = () => {
    const options = quizData[currentQuestion].options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.optionButton}
        onPress={() => handleAnswer(option)}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));

    const rows = [];
    let row = [];
    options.forEach((option, index) => {
      if (index % 2 === 0 && index > 0) {
        rows.push(<View style={styles.optionRow}>{row}</View>);
        row = [];
      }
      row.push(option);
    });
    rows.push(<View style={styles.optionRow}>{row}</View>);

    return rows;
  };

  const handlePhoneAFriend = () => {
    setShowPopup(true);
  };

  const dismissPopup = () => {
    setShowPopup(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.phoneFriendButton} onPress={handlePhoneAFriend}>
        <Text style={styles.phoneFriendText}>Phone a Friend</Text>
      </TouchableOpacity>
      <Text style={styles.questionText}>{quizData[currentQuestion].question}</Text>
      <View style={styles.optionsContainer}>{renderOptions()}</View>
      <Modal visible={showPopup} animationType="slide" transparent={true}>
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>Chris Tarrant says no!</Text>
          <Button title="Dismiss" onPress={dismissPopup} />
        </View>
      </Modal>
    </View>
  );
};

const ScoreScreen = ({ navigation, route }) => {
  const { score, totalQuestions } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Quiz finished!</Text>
      <Text style={styles.scoreText}>Your score: {score}/{totalQuestions}</Text>
      <TouchableOpacity
        style={styles.restartButton}
        onPress={() => {
          navigation.navigate('Welcome');
        }}
      >
        <Text style={styles.restartButtonText}>Restart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.returnButtonText}>Main Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Score" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  welcomeLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: 'orange',
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  startButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  phoneFriendButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
  },
  phoneFriendText: {
    fontSize: 16,
    color: 'white',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  restartButton: {
    backgroundColor: 'orange',
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  restartButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  returnButton: {
    backgroundColor: 'orange',
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  returnButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
});
