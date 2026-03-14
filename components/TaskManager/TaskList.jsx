import { View, Text, Button } from "react-native";

export const TaskList = ({ tasks = [], onDelete }) => {
  return (
    <>
      {tasks.map((task) => (
        <View key={task.taskId}>

          <Text>{task.taskText}</Text>

          {task.taskDescription && (
            <Text>{task.taskDescription}</Text>
          )}

          <Button
            title="Delete"
            onPress={() => onDelete(task.taskId)}
          />

        </View>
      ))}
    </>
  );
};