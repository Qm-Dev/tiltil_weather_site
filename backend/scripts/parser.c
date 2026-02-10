#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void replace_char(char *row, char old_char, char new_char) {
    const int row_length = strlen(row);
    for (int i = 0; i < row_length; i++) {
        if (row[i] == old_char) {
            row[i] = new_char;
        }
    }
}

void row_processing(char *row_file) {
    char *row = strtok(row_file, "\n");
    replace_char(row, '\t', ';');
    replace_char(row, ',', '.');  // For Spanish Excel
};

int main() {

    char line_input_file[512];

    FILE *input_file = fopen("txts/historic.txt", "r");
    if (input_file == NULL) {
        printf("An error occurred trying to initialize the input file.");
        return -1;
    }

    FILE *output_file = fopen("csvs/historic.csv", "w");
    if (output_file == NULL) {
        fclose(input_file);
        printf("An error occurred trying to initialize the output file.");
        return -1;
    }

    // Skip WL Report Header
    for (int i=0; i<2; i++){
        fgets(line_input_file, sizeof(line_input_file), input_file);
    }

    // Write header for the new file
    fprintf(output_file, "Date;Time;Avg Temp;Hi Temp;Low Temp;Out Hum;Dew Pt;Wind Speed;Wind Direction;Wind Run;Hi Speed;Hi Dir;Wind Chill;Heat Index;THW Index;THSW Index;Bar;Rain;Rain Rate;Solar Rad;Solar Energy;Hi Solar Rad;UV Index;UV Dose;Hi UV;Heat D-D;Cool D-D;In Temp;In Hum;In Dew;In Heat;In EMC;In Air Density;ET;Wind Samp;Wind Tx;ISS Recept;Arc. Int.\n");

    printf("Executing...");
    while (fgets(line_input_file, sizeof(line_input_file), input_file) != NULL) {
        row_processing(line_input_file);
        fprintf(output_file, "%s\n", line_input_file);
    }
    fclose(input_file);
    fclose(output_file);
    printf("\nDone! Your CSV has been created successfully.");
    return 0;
}