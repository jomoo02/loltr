<template>
    <div class="flex flex-col mt-1 mb-4 lg:mt-2.5 lg:mb-4">
        <MatchCardArenaDetailTeam
            placement="1st"
            :maxDamage="maxDamage"
            :maxDamageTaken="maxDamageTaken"
            :participants="teams_placement[1].participants"
            :participantsKDA="teams_placement[1].participantsKDA"
            :participantsItems="teams_placement[1].participantsItems"
            :checkRedo="checkRedo"
            :checkWin="true"
            :puuid="puuid"
        />
        <MatchCardArenaDetailTeam
            placement="2nd"
            :maxDamage="maxDamage"
            :maxDamageTaken="maxDamageTaken"
            :participants="teams_placement[2].participants"
            :participantsKDA="teams_placement[2].participantsKDA"
            :participantsItems="teams_placement[2].participantsItems"
            :checkRedo="checkRedo"
            :checkWin="true"
            :puuid="puuid"
        />
        <MatchCardArenaDetailTeam
            placement="3rd"
            :maxDamage="maxDamage"
            :maxDamageTaken="maxDamageTaken"
            :participants="teams_placement[3].participants"
            :participantsKDA="teams_placement[3].participantsKDA"
            :participantsItems="teams_placement[3].participantsItems"
            :checkRedo="checkRedo"
            :checkWin="false"
            :puuid="puuid"
        />
        <MatchCardArenaDetailTeam
            placement="4th"
            :maxDamage="maxDamage"
            :maxDamageTaken="maxDamageTaken"
            :participants="teams_placement[4].participants"
            :participantsKDA="teams_placement[4].participantsKDA"
            :participantsItems="teams_placement[4].participantsItems"
            :checkRedo="checkRedo"
            :checkWin="false"
            :puuid="puuid"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    teams_placement: {
        type: Object
    },
    maxDamage: {
        type: Number
    },
    maxDamageTaken: {
        type: Number
    },
    gameResult: {
        type: String
    },
    puuid: {
        type: String
    }
});

const checkRedo = props.gameResult === '다시하기' ? true : false;

</script>

