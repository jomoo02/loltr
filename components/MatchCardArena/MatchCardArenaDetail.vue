<template>
    <div class="flex flex-col mt-1 mb-4 lg:mt-2.5 lg:mb-4">
        <MatchCardArenaDetailTeam
            placement="1st"
            :maxDamageDTO="maxDamageDTO"
            :participants="teams_placement.get(1).participants"
            :checkRedo="checkRedo"
            :checkWin="true"
            :puuid="puuid"
        />
        <MatchCardArenaDetailTeam
            placement="2nd"
            :maxDamageDTO="maxDamageDTO"
            :participants="teams_placement.get(2).participants"
            :checkRedo="checkRedo"
            :checkWin="true"
            :puuid="puuid"
        />
        <MatchCardArenaDetailTeam
            placement="3rd"
            :maxDamageDTO="maxDamageDTO"
            :participants="teams_placement.get(3).participants"
            :checkRedo="checkRedo"
            :checkWin="false"
            :puuid="puuid"
        />
        <MatchCardArenaDetailTeam
            placement="4th"
            :maxDamageDTO="maxDamageDTO"
            :participants="teams_placement.get(4).participants"
            :checkRedo="checkRedo"
            :checkWin="false"
            :puuid="puuid"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    teams_placement: {
        type: Map
    },
    maxDamageDTO: {
        type: Object
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

