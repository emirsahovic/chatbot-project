import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import uuid from "react-uuid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addInfo } from "../redux/infoSlice";
import { useNavigate } from "react-router-dom";

const theme = {
  background: "#f5f8fb",
  headerBgColor: "#8533ff",
  headerFontSize: "20px",
  botBubbleColor: "#8533ff",
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#fff",
  userFontColor: "black",
};

const Review = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { steps } = props;
    const {
      personsOptions,
      ageAnswer,
      stateAnswer,
      personAgeAnswer,
      diagnosisAnswer,
      testOptions,
      testTypeRemember,
      testTypeAnswer,
      testScoreAnswer,
      personHealthAnswer,
      healthIssuesAnswer,
      livingOptions,
      personAliveAnswer,
      personAliveAgeAnswer,
      personHealthAnswer2,
      healthIssuesAnswer2,
    } = steps;
    dispatch(
      addInfo({
        testId: props.testId,
        firstPerson: personsOptions.value,
        myAge: ageAnswer.value,
        myState: stateAnswer.value,
        firstPersonAge: personAgeAnswer.value,
        firstPersonDiagnosis: diagnosisAnswer.value,
        testYesNo: testOptions ? testOptions.value : "",
        testTypeRemember: testTypeRemember ? testTypeRemember.value : "",
        testType: testTypeAnswer ? testTypeAnswer.value : "",
        testScore: testScoreAnswer ? testScoreAnswer.value : "",
        firstPersonHealth: personHealthAnswer ? personHealthAnswer.value : "",
        firstPersonHealthIssues: healthIssuesAnswer ? healthIssuesAnswer.value : "",
        firstPersonLiving: livingOptions.value,
        secondPersonAlive: personAliveAnswer.value,
        secondPersonAge: personAliveAgeAnswer ? personAliveAgeAnswer.value : "",
        secondPersonHealth: personHealthAnswer2 ? personHealthAnswer2.value : "",
        secondPersonHealthIssues: healthIssuesAnswer2 ? healthIssuesAnswer2.value : "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      navigate("/results");
    }, 1500);
  }, [navigate]);

  return <div style={{ width: "100%" }}>Thanks! Your data was submitted successfully!</div>;
};

const Chatbot = () => {
  const [chatbotKey, setChatbotKey] = useState("a");
  const [testId, setTestId] = useState(uuid());

  const handleClear = () => {
    setChatbotKey(uuid());
    setTestId(uuid());
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot
          key={chatbotKey}
          headerTitle="Test Chat"
          steps={[
            {
              id: "intro",
              message: "Intro: This anonymized questionnaire will take 5 minutes or less.",
              trigger: "disclaimer",
            },
            {
              id: "disclaimer",
              message:
                "Disclaimers: This is not a medical assessment test. Information provided shall not be used to make any medical decision or plans. Always consult your doctor and/or healthcare professional. This planning tool is anonymous, you won't be asked to enter your name or names of any affected individuals.",
              trigger: "terms",
            },
            {
              id: "terms",
              message: `I agree to these terms and conditions [Test ID: ${testId}]`,
              trigger: "termsOptions",
            },
            {
              id: "termsOptions",
              options: [
                { value: true, label: "Yes", trigger: "getStarted" },
                { value: false, label: "No", trigger: "endMessageTerms" },
              ],
            },
            {
              id: "endMessageTerms",
              message: "Sorry we can not proceed without your consent to the above.",
              end: true,
            },
            {
              id: "getStarted",
              message: "Let's get started.",
              trigger: "personWithDementia",
            },
            {
              id: "personWithDementia",
              message: "Who is a person with diagnosed or suspected dementia?",
              trigger: "personsOptions",
            },
            {
              id: "personsOptions",
              options: [
                { value: "mom", label: "Mom", trigger: "aboutYou" },
                { value: "dad", label: "Dad", trigger: "aboutYou" },
                { value: "spouse", label: "Spouse", trigger: "aboutYou" },
                { value: "other", label: "Other", trigger: "otherMessage" },
              ],
            },
            {
              id: "otherMessage",
              message: "Currently the planning tool does not support other iterations. Check back again soon.",
              trigger: "personWithDementia",
            },
            {
              id: "aboutYou",
              message: "Ok let's get a few questions answered about you.",
              trigger: "ageQuestion",
            },
            {
              id: "ageQuestion",
              message: "What is your age?",
              trigger: "ageAnswer",
            },
            {
              id: "ageAnswer",
              user: true,
              trigger: "stateQuestion",
              validator: (value) => {
                if (isNaN(value)) {
                  return "Value must be a number";
                } else if (value < 0) {
                  return "Value must be positive";
                } else if (value > 120) {
                  return `${value}? Come on!`;
                }

                return true;
              },
            },
            {
              id: "stateQuestion",
              message: "What state do you live in?",
              trigger: "stateAnswer",
            },
            {
              id: "stateAnswer",
              user: true,
              trigger: "thanksMessage",
              validator: (value) => {
                if (!isNaN(value)) {
                  return "Numbers are not allowed";
                }

                return true;
              },
            },
            {
              id: "thanksMessage",
              message: "Thanks. Few questions about the affected individual.",
              trigger: "personAgeQuestion",
            },
            {
              id: "personAgeQuestion",
              message: ({ previousValue, steps }) => `What is ${steps.personsOptions.value}'s age?`,
              trigger: "personAgeAnswer",
            },
            {
              id: "personAgeAnswer",
              user: true,
              trigger: "diagnosisQuestion",
              validator: (value) => {
                if (isNaN(value)) {
                  return "Value must be a number";
                } else if (value < 0) {
                  return "Value must be positive";
                } else if (value > 120) {
                  return `${value}? Come on!`;
                }

                return true;
              },
            },
            {
              id: "diagnosisQuestion",
              message: ({ previousValue, steps }) => `Has ${steps.personsOptions.value} been diagnosed with dementia?`,
              trigger: "diagnosisAnswer",
            },
            {
              id: "diagnosisAnswer",
              options: [
                { value: "yes", label: "Yes", trigger: "sorryMessage" },
                { value: "no", label: "No", trigger: "personHealthQuestion" },
              ],
            },
            {
              id: "sorryMessage",
              message: "Ok, sorry to hear that.",
              trigger: "testQuestion",
            },
            {
              id: "testQuestion",
              message: "Was an assessment test performed?",
              trigger: "testOptions",
            },
            {
              id: "testOptions",
              options: [
                { value: "yes", label: "Yes", trigger: "testTypeRememberQuestion" },
                { value: "no", label: "No", trigger: "noTestMessage" },
              ],
            },
            {
              id: "noTestMessage",
              message:
                "That's ok we can still proceed. Test information would allow us to calculate a more accurate assessment. You can always come back and redo the test with that information to see the updated results.",
              trigger: "personHealthQuestion",
            },
            {
              id: "testTypeRememberQuestion",
              message: "Do you recall what type of test? It's ok if you don't recall. For example you can say MMSE test.",
              trigger: "testTypeRemember",
            },
            {
              id: "testTypeRemember",
              options: [
                { value: "yes", label: "I do", trigger: "testTypeQuestion" },
                { value: "no", label: "I don't", trigger: "noTestMessage" },
              ],
            },
            {
              id: "testTypeQuestion",
              message: "What type of test?",
              trigger: "testTypeAnswer",
            },
            {
              id: "testTypeAnswer",
              user: true,
              trigger: "testScoreQuestion",
            },
            {
              id: "testScoreQuestion",
              message: "What was the score of that test?",
              trigger: "testScoreAnswer",
            },
            {
              id: "testScoreAnswer",
              user: true,
              trigger: "testScoreMessage",
            },
            {
              id: "testScoreMessage",
              message: "Thanks got it.",
              trigger: "personHealthQuestion",
            },
            {
              id: "personHealthQuestion",
              message: ({ previousValue, steps }) => `Is ${steps.personsOptions.value} in good health otherwise?`,
              trigger: "personHealthAnswer",
            },
            {
              id: "personHealthAnswer",
              options: [
                { value: "yes", label: "Yes", trigger: "gladMessage" },
                { value: "no", label: "No", trigger: "sorryGladMessage" },
              ],
            },
            {
              id: "gladMessage",
              message: "Glad to hear it.",
              trigger: "currentlyLivingMessage",
            },
            {
              id: "sorryGladMessage",
              message:
                "Sorry to hear that. We can't assess the impact of serious conditions that may lead to life span changes but we can take into account things like diabetes, high blood pressure and similar.",
              trigger: "healthIssuesQuestion",
            },
            {
              id: "healthIssuesQuestion",
              message: ({ previousValue, steps }) =>
                `What other health issues does ${
                  steps.personsOptions.value === "mom" ? "she" : steps.personsOptions.value === "dad" ? "he" : "he/she"
                } have?`,
              trigger: "healthIssuesAnswer",
            },
            {
              id: "healthIssuesAnswer",
              user: true,
              trigger: ({ previousValue, steps }) =>
                `${
                  steps.healthIssuesAnswer.value.toLowerCase().includes("high blood pressure") ||
                  steps.healthIssuesAnswer.value.toLowerCase().includes("diabetes")
                    ? "currentlyLivingMessage"
                    : "conditionMessage"
                }`,
            },
            {
              id: "conditionMessage",
              message: "This condition will not be taken into account for the planning tool as its hard to estimate its impact at this time.",
              trigger: "currentlyLivingMessage",
            },
            {
              id: "currentlyLivingMessage",
              message: ({ previousValue, steps }) =>
                `Where ${
                  steps.personsOptions.value === "dad" ? "is he" : steps.personsOptions.value === "mom" ? "is she" : "is he/she"
                } currently living?`,
              trigger: "livingOptions",
            },
            {
              id: "livingOptions",
              options: [
                { value: "home", label: "At home", trigger: "personAliveQuestion" },
                { value: "nursing facility", label: "Nursing facility", trigger: "personAliveQuestion" },
                { value: "with me", label: "With me", trigger: "personAliveQuestion" },
              ],
            },
            {
              id: "personAliveQuestion",
              message: ({ previousValue, steps }) => `Ìs your ${steps.personsOptions.value === "dad" ? "mom" : "dad"} alive?`,
              trigger: "personAliveAnswer",
            },
            {
              id: "personAliveAnswer",
              options: [
                { value: "yes", label: "Yes", trigger: "personAliveAgeQuestion" },
                { value: "no", label: "No", trigger: "endMessage" },
              ],
            },
            {
              id: "personAliveAgeQuestion",
              message: ({ previousValue, steps }) => `What is ${steps.personsOptions.value === "dad" ? "her" : "his"} age?`,
              trigger: "personAliveAgeAnswer",
            },
            {
              id: "personAliveAgeAnswer",
              user: true,
              trigger: "personHealthQuestion2",
              validator: (value) => {
                if (isNaN(value)) {
                  return "Value must be a number";
                } else if (value < 0) {
                  return "Value must be positive";
                } else if (value > 120) {
                  return `${value}? Come on!`;
                }

                return true;
              },
            },
            {
              id: "personHealthQuestion2",
              message: ({ previousValue, steps }) => `Is ${steps.personsOptions.value === "dad" ? "she" : "he"} in good health?`,
              trigger: "personHealthAnswer2",
            },
            {
              id: "personHealthAnswer2",
              options: [
                { value: "yes", label: "Yes", trigger: "gladMessage2" },
                { value: "no", label: "No", trigger: "sorryGladMessage2" },
              ],
            },
            {
              id: "gladMessage2",
              message: "Glad to hear it.",
              trigger: "endMessage",
            },
            {
              id: "sorryGladMessage2",
              message:
                "Sorry to hear that. We can't assess the impact of serious conditions that may lead to life span changes but we can take into account things like diabetes, high blood pressure and similar.",
              trigger: "healthIssuesQuestion2",
            },
            {
              id: "healthIssuesQuestion2",
              message: ({ previousValue, steps }) =>
                `What other health issues does ${steps.personsOptions.value === "mom" ? "he" : steps.personsOptions.value === "she"} have?`,
              trigger: "healthIssuesAnswer2",
            },
            {
              id: "healthIssuesAnswer2",
              user: true,
              trigger: ({ previousValue, steps }) =>
                `${
                  steps.healthIssuesAnswer2.value.toLowerCase().includes("high blood pressure") ||
                  steps.healthIssuesAnswer2.value.toLowerCase().includes("diabetes")
                    ? "endMessage"
                    : "conditionMessage2"
                }`,
            },
            {
              id: "conditionMessage2",
              message: "This condition will not be taken into account for the planning tool as its hard to estimate its impact at this time.",
              trigger: "endMessage",
            },
            {
              id: "endMessage",
              component: <Review testId={testId} />,
              asMessage: true,
              end: true,
            },
          ]}
        />
      </ThemeProvider>
      <div className="text-center mt-16">
        <button className="bg-[#8533ff] py-2 px-3 rounded-md text-white" onClick={() => handleClear()}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
